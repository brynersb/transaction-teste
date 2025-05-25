import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ValidTransactionRepositoryInterface } from './valid-transaction.respotiroty.interface';
import { Transaction as TransactionEntity } from '../../entities/transaction.entity';
import { Transaction } from '../../../types/transaction.types';

export class ValidTransactionRepository
  implements ValidTransactionRepositoryInterface
{
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly repository: Repository<TransactionEntity>,
  ) {}

  async create(params: Transaction[]): Promise<void> {
    await this.repository.save(params);
  }
}
