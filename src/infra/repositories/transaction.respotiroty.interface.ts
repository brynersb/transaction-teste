import { TransactionCreate } from '../../types/transaction.types';
import { TransactionEntity } from '../entities/transaction.entity';

export interface TransactionRepositoryInterface {
  create(params: TransactionCreate[]): Promise<TransactionEntity[]>;
}
