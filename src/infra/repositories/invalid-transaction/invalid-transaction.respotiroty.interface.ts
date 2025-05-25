import { InvalidTransaction } from '../../../types/transaction.types';

export interface InvalidTransactionRepositoryInterface {
  create(params: InvalidTransaction[]): Promise<void>;
}
