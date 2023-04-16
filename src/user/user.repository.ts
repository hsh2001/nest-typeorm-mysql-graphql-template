import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DATA_SOURCE_TOKEN } from '../database/database.provider';
import { MySQLTransactionOptions } from '../lib/database/interfaces/mysql-transaction-options.interface';
import { BaseMySQLRepository } from '../lib/database/repositories/base-mysql.repository';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends BaseMySQLRepository<User> {
  constructor(
    @Inject(DATA_SOURCE_TOKEN)
    private readonly dataSource: DataSource,
  ) {
    super(dataSource.getRepository(User));
  }

  async getByLoginIdentifier(
    loginIdentifier: string,
    options?: MySQLTransactionOptions,
  ): Promise<User> {
    return this.getRepositoryWithTransaction(options).findOneOrFail({
      where: { loginIdentifier },
    });
  }

  async countByLoginIdentifier(
    loginIdentifier: string,
    options?: MySQLTransactionOptions,
  ): Promise<number> {
    return this.getRepositoryWithTransaction(options).count({
      where: { loginIdentifier },
    });
  }

  async create({
    loginIdentifier,
    hashedPassword,
    nickname,
    ...transactionOptions
  }: {
    loginIdentifier: string;
    hashedPassword: string;
    nickname: string;
  } & MySQLTransactionOptions): Promise<User> {
    return this.getRepositoryWithTransaction(transactionOptions).save({
      loginIdentifier,
      hashedPassword,
      nickname,
    });
  }

  async changeNickname({
    userId,
    nickname,
    ...options
  }: {
    userId: number;
    nickname: string;
  } & MySQLTransactionOptions) {
    await this.getRepositoryWithTransaction(options).update(userId, {
      nickname,
    });
  }
}
