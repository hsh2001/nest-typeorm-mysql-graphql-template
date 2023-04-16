import * as dotenv from 'dotenv-safe';

dotenv.config();

const { env } = process;

export const config = {
  database: {
    mysql: {
      host: env.MYSQL_HOST || 'localhost',
      port: +(env.MYSQL_PORT || 32769),
      password: env.MYSQL_PASSWORD || '123123',
      username: env.MYSQL_USERNAME || 'root',
      database: env.MYSQL_DATABASE || 'hahaha',
    },
  },

  jwt: {
    secret: env.JWT_SECRET || 'secret'.repeat(10),
  },

  hash: {
    rounds: +(env.HASH_ROUNDS || 10),
  },
} as const;
