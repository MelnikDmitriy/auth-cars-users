import { DataSource } from 'typeorm';
import { OrmConfig } from './orm.config';

const datasource = new DataSource(OrmConfig);
export default datasource;