// create-transactions.usecase.spec.ts

import { Transaction } from '../types/transaction.types';
import { CreateTransacionsUsecase } from './create-transactions-usecase';

describe('CreateTransacionsUsecase', () => {
  const mockValidRepo = { create: jest.fn() };
  const mockInvalidRepo = { create: jest.fn() };
  const mockLogger = { log: jest.fn(), error: jest.fn(), warn: jest.fn() };

  const usecase = new CreateTransacionsUsecase(
    mockValidRepo,
    mockInvalidRepo,
    mockLogger,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should save only valid transactions', async () => {
    const transactions: Transaction[] = [
      {
        from: 'A',
        to: 'B',
        amount: '100',
        created_at: new Date(),
      },
      { from: 'B', to: 'C', amount: '6000000', created_at: new Date() },
      { from: 'A', to: 'B', amount: '100', created_at: new Date() },
      { from: 'X', to: 'Y', amount: '-30', created_at: new Date() },
    ];

    const result = await usecase.execute(transactions, 'teste.csv');

    expect(mockValidRepo.create).toHaveBeenCalledWith([
      {
        from: 'B',
        to: 'C',
        amount: '6000000',
        created_at: transactions[1].created_at,
        suspect: true,
      },
    ]);
    expect(mockInvalidRepo.create).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ reason: 'Duplicate' }),
        expect.objectContaining({ reason: 'Nevative value' }),
      ]),
    );
    expect(result.transactionsWithSucess).toBe(1);
    expect(result.invalidTransactions).toBe(3);
    expect(result.sumaryInvalidTransacions.length).toBe(3);
    expect(mockLogger.log).toHaveBeenCalled();
  });

  it('should return all as valid if no violations', async () => {
    const transactions: Transaction[] = [
      { from: 'A', to: 'B', amount: '5000', created_at: new Date() },
      { from: 'C', to: 'D', amount: '10000', created_at: new Date() },
    ];

    const result = await usecase.execute(transactions, 'ok.csv');

    expect(result.transactionsWithSucess).toBe(2);
    expect(result.invalidTransactions).toBe(0);
    expect(mockValidRepo.create).toHaveBeenCalledTimes(1);
    expect(mockInvalidRepo.create).not.toHaveBeenCalled();
  });
});
