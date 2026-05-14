import { Role } from '../entities/user.entity';

export class CreateUserDto {
  fullName: string;
  email: string;
  passwordHash: string;
  dateOfBirth: Date;
  role: Role;
}
