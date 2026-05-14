import 'reflect-metadata';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false,

  entities: ['src/modules/**/entities/*.entity.ts'],
  migrations: ['src/database/migrations/!(data-source).ts'],

  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
});
