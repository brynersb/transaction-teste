import {
  CreateTransacionsDTO,
  InvalidTransaction,
  Transaction,
  ValidationResult,
} from '../types/transaction.types';
import { ValidTransactionRepositoryInterface } from '../infra/repositories/valid-transacions/valid-transaction.respotiroty.interface';
import { InvalidTransactionRepositoryInterface } from '../infra/repositories/invalid-transaction/invalid-transaction.respotiroty.interface';
import { CreateTransacionsUsecaseInterface } from './create-transactions-usecase.interface';
import { LoggerServiceInterface } from '../services/logger/logger.interface';

export class CreateTransacionsUsecase
  implements CreateTransacionsUsecaseInterface
{
  constructor(
    private readonly validRepository: ValidTransactionRepositoryInterface,
    private readonly invalidRepository: InvalidTransactionRepositoryInterface,
    private readonly loggerService: LoggerServiceInterface,
  ) {}
  async execute(
    transactioins: Transaction[],
    fileName: string,
  ): Promise<CreateTransacionsDTO> {
    const validateResult = this.transactionValidation(transactioins, fileName);
    if (validateResult?.valid.length) {
      await this.validRepository.create(validateResult.valid);
    }

    if (validateResult?.invalid.length) {
      await this.invalidRepository.create(validateResult.invalid);
    }

    const result = {
      transactionsWithSucess: validateResult.quantityValid,
      invalidTransactions:
        validateResult?.quantityDuplicate + validateResult?.quantityNegative,
      sumaryInvalidTransacions: validateResult?.invalid,
    };

    return result;
  }
  transactionValidation(
    transactions: Transaction[],
    fileName: string,
  ): ValidationResult {
    const count: Record<string, number> = {};

    for (const transaction of transactions) {
      const key = `${transaction.from}|${transaction.to}|${transaction.amount}`;
      count[key] = (count[key] || 0) + 1;
    }

    const valid: Transaction[] = [];
    const invalid: InvalidTransaction[] = [];
    let quantityDuplicate = 0;
    let quantityNegative = 0;
    let quantityValid = 0;
    for (const transaction of transactions) {
      const key = `${transaction.from}|${transaction.to}|${transaction.amount}`;

      if (+transaction.amount < 0) {
        invalid.push({
          ...transaction,
          reason: 'Nevative value',
          fileName: fileName,
        });
        quantityNegative++;
      } else if (count[key] > 1) {
        invalid.push({
          ...transaction,
          reason: 'Duplicate',
          fileName: fileName,
        });
        quantityDuplicate++;
      } else {
        quantityValid++;
        valid.push({
          ...transaction,
          suspect: +transaction.amount > 5_000_000,
        });
      }
    }

    return {
      valid,
      invalid,
      quantityValid,
      quantityDuplicate,
      quantityNegative,
    };
  }
}
