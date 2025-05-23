import { InjectRepository } from '@nestjs/typeorm';
import { TransactionRepositoryInterface } from './transaction.respotiroty.interface';
import { TransactionEntity } from '../entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionCreate } from '../../types/transaction.types';

export class TransactionRepository implements TransactionRepositoryInterface {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly repository: Repository<TransactionEntity>,
  ) {}
  async create(params: TransactionCreate[]): Promise<TransactionEntity[]> {
    return await this.repository.save(params);
  }
}
