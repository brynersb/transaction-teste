import { Transaction } from '../../../types/transaction.types';

export interface ValidTransactionRepositoryInterface {
  create(params: Transaction[]): Promise<void>;
}
