import { ValidTransactionRepository } from './valid-transaction.repository';
import { Repository } from 'typeorm';
import { Transaction as TransactionEntity } from '../../entities/transaction.entity';
import { Transaction } from '../../../types/transaction.types';

describe('ValidTransactionRepository', () => {
  let repository: Repository<TransactionEntity>;
  let repoImpl: ValidTransactionRepository;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
    } as unknown as Repository<TransactionEntity>;

    repoImpl = new ValidTransactionRepository(repository as any);
  });

  it('should call save with valid transactions', async () => {
    const transactions: Transaction[] = [
      {
        from: 'X',
        to: 'Y',
        amount: '100_000',
        suspect: false,
      },
    ];

    await repoImpl.create(transactions);

    expect(repository.save).toHaveBeenCalledWith(transactions);
    expect(repository.save).toHaveBeenCalledTimes(1);
  });
});
