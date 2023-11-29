import 'dotenv/config';
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_PORT = process.env.APP_PORT;
const DB_HOST = process.env.DB_HOST;
const URL_DEFAULT = process.env.URL_DEFAULT;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const MINIO_ROOT_USER = process.env.MINIO_ROOT_USER;
const MINIO_ROOT_PASSWORD = process.env.MINIO_ROOT_PASSWORD;

export {
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME,
  DB_PORT,
  DB_HOST,
  URL_DEFAULT,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  MINIO_ROOT_USER,
  MINIO_ROOT_PASSWORD,
};
