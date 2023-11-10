
import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import {
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from "../constants/enviroment"

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: "localhost",
  port: parseInt(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [__dirname + '/../**/entities/*.entity.{js,ts}'], 
  synchronize: false,
  autoLoadEntities: true,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const OrmConfig = {
  ...typeOrmModuleOptions,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*.{js,ts}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
} as DataSourceOptions;

export default OrmConfig;