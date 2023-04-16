import { Repository, FindOptionsWhere } from 'typeorm';
import { MySQLTransactionOptions } from '../interfaces/mysql-transaction-options.interface';

export class BaseMySQLRepository<T extends { id: number }> {
  constructor(private readonly typeormRepo: Repository<T>) {}

  getRepositoryWithTransaction(
    options?: MySQLTransactionOptions,
  ): Repository<T> {
    const manager = options?.manager || options?.queryRunner?.manager;
    return manager?.withRepository(this.typeormRepo) || this.typeormRepo;
  }

  getById(id: number, options?: MySQLTransactionOptions) {
    return this.getRepositoryWithTransaction(options).findOneOrFail({
      where: { id } as FindOptionsWhere<T>,
    });
  }
}
