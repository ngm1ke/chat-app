// test/user.integration.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User, Role } from './entities/user.entity';

let app: TestingModule;
let dataSource: DataSource;
let repository: Repository<User>;
let userService: UsersService;

beforeAll(async () => {
  app = await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.TEST_DB_HOST ?? 'localhost',
        port: 5433,
        username: 'postgres',
        password: 'password',
        database: 'school_management_test', // make sure create it first
        entities: [User],
        synchronize: true,
        dropSchema: true,
      }),
      TypeOrmModule.forFeature([User]),
    ],
    providers: [UsersService],
  }).compile();

  dataSource = app.get<DataSource>(getDataSourceToken());
  userService = app.get<UsersService>(UsersService);
  repository = dataSource.getRepository(User);
});

afterEach(async () => {
  await repository.query('TRUNCATE TABLE "users" CASCADE');
});

afterAll(async () => {
  await app.close();
});

describe('UserService', () => {
  it('findOne returns the created user', async () => {
    const saved = await repository.save({
      fullName: 'Alice',
      email: 'alice@test.com',
      passwordHash: 'hash',
      dateOfBirth: new Date(),
      role: Role.STUDENT,
    });
    const found = await userService.findOne(saved.id);
    expect(found).toMatchObject({ fullName: 'Alice' });
  });

  it('update changes the name', async () => {
    const saved = await repository.save({
      fullName: 'Bob',
      email: 'bob@test.com',
      passwordHash: 'hash',
      dateOfBirth: new Date(),
      role: Role.STUDENT,
    });

    await userService.update(saved.id, { fullName: 'Bobby' });
    const updated = await repository.findOneBy({ id: saved.id });
    expect(updated?.fullName).toBe('Bobby');
  });
});
