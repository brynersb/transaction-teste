import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from './infra/entities/transaction.entity';
import { TransactionRepository } from './infra/repositories/transaction.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/infra/db/database',
      entities: [TransactionEntity],
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([TransactionEntity]),
  ],
  controllers: [AppController],
  providers: [AppService, TransactionRepository],
})
export class AppModule {}
