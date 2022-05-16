import { ConnectionOptions } from 'typeorm';

import config from './src/config';

const ormconfig: ConnectionOptions = {
  type: 'mysql',
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: process.env.NODE_ENV == 'development' ? true : false,
  logging: process.env.NODE_ENV == 'development' ? false : false,
  dropSchema: process.env.NODE_ENV == 'development' ? true : false,
  migrations: ['dist/src/database/migration/*{.ts,.js}'],
  entities: ['dist/src/**/*.entity{.ts,.js}'],
  bigNumberStrings: false,
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default ormconfig;
