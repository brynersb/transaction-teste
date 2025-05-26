import { InvalidTransactionRepository } from './invalid-transaction.repository';
import { Repository } from 'typeorm';
import { InvalidTransaction as InvalidTransactionEntity } from '../../entities/invalidTransactions.entity';
import { InvalidTransaction } from '../../../types/transaction.types';

describe('InvalidTransactionRepository', () => {
  let repository: Repository<InvalidTransactionEntity>;
  let repoImpl: InvalidTransactionRepository;

  beforeEach(() => {
    repository = {
      save: jest.fn(),
    } as unknown as Repository<InvalidTransactionEntity>;

    repoImpl = new InvalidTransactionRepository(repository as any);
  });

  it('should call save with invalid transactions', async () => {
    const transactions: InvalidTransaction[] = [
      {
        from: 'A',
        to: 'B',
        amount: '1000',
        reason: 'Duplicate',
        fileName: 'test.xlsx',
        created_at: new Date(),
      },
    ];

    await repoImpl.create(transactions);

    expect(repository.save).toHaveBeenCalledWith(transactions);
    expect(repository.save).toHaveBeenCalledTimes(1);
  });
});
