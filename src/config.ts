import * as dotenv from 'dotenv-safe';

dotenv.config({
  allowEmptyValues: false,
  path: '.env.private',
});

const config = {
  db: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
} as const;

export default config;
