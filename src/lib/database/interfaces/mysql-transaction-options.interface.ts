import { EntityManager, QueryRunner } from 'typeorm';

export interface MySQLTransactionOptions {
  manager?: EntityManager;
  queryRunner?: QueryRunner;
}
