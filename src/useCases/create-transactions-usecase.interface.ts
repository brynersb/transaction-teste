import { CreateTransacionsDTO, Transaction } from '../types/transaction.types';

export interface CreateTransacionsUsecaseInterface {
  execute(
    transactioins: Transaction[],
    fileName: string,
  ): Promise<CreateTransacionsDTO>;
}
