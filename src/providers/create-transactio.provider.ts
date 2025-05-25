import { Provider } from '@nestjs/common';
import { InvalidTransactionRepositoryInterface } from '../infra/repositories/invalid-transaction/invalid-transaction.respotiroty.interface';
import { ValidTransactionRepositoryInterface } from '../infra/repositories/valid-transacions/valid-transaction.respotiroty.interface';
import { CreateTransacionsUsecase } from '../useCases/create-transactions-usecase';
import { LoggerServiceInterface } from '../services/logger/logger.interface';

export const CreateTransacionsUsecaseProvider = {
  provide: 'CreateTransacionsUsecaseInterface',
  useFactory: (
    validRepository: ValidTransactionRepositoryInterface,
    invalidtRepository: InvalidTransactionRepositoryInterface,
    loggerService: LoggerServiceInterface,
  ) => {
    return new CreateTransacionsUsecase(
      validRepository,
      invalidtRepository,
      loggerService,
    );
  },
  inject: [
    'ValidTransactionRepositoryInterface',
    'InvalidTransactionRepositoryInterface',
    'LoggerServiceInterface',
  ],
} as Provider;
