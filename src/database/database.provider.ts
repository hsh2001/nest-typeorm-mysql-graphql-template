import { DataSource } from 'typeorm';
import { config } from '../lib/config';
import { Inject } from '@nestjs/common';

export const DATA_SOURCE_TOKEN = 'DATA_SOURCE';

export const _getMySQLDataSource = () =>
  new DataSource({
    type: 'mysql',
    entities: ['dist/**/**/*.entity{.js,.ts}'],
    migrations: ['dist/**/migrations/*{.js,.ts}'],
    synchronize: false,
    ...config.database.mysql,
  });

export const databaseProviders = [
  {
    provide: DATA_SOURCE_TOKEN,
    useFactory: async () => {
      return _getMySQLDataSource().initialize();
    },
  },
] as const;

export const InjectDataSource = () => Inject(DATA_SOURCE_TOKEN);
