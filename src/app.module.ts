import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './infra/entities/transaction.entity';
import { ValidTransactionRepository } from './infra/repositories/valid-transacions/valid-transaction.repository';
import { InvalidTransactionRepository } from './infra/repositories/invalid-transaction/invalid-transaction.repository';
import { InvalidTransaction } from './infra/entities/invalidTransactions.entity';
import { LoggerModule } from 'nestjs-pino';
import { CreateTransacionsUsecaseProvider } from './providers/create-transactio.provider';
import { LoggerService } from './services/logger/logger.service';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false,
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            ignore: 'pid,hostname,req,context',
            translateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",
          },
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/infra/db/database',
      entities: [Transaction, InvalidTransaction],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Transaction, InvalidTransaction]),
  ],
  controllers: [AppController],
  providers: [
    { provide: 'LoggerServiceInterface', useClass: LoggerService },
    {
      provide: 'ValidTransactionRepositoryInterface',
      useClass: ValidTransactionRepository,
    },
    {
      provide: 'InvalidTransactionRepositoryInterface',
      useClass: InvalidTransactionRepository,
    },
    AppService,
    CreateTransacionsUsecaseProvider,
  ],
})
export class AppModule {}
