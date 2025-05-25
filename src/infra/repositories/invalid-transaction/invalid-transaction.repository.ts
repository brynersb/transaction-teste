import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvalidTransaction } from '../../../types/transaction.types';
import { InvalidTransactionRepositoryInterface } from './invalid-transaction.respotiroty.interface';
import { InvalidTransaction as InvalidTransactionEntitty } from '../../entities/invalidTransactions.entity';

export class InvalidTransactionRepository
  implements InvalidTransactionRepositoryInterface
{
  constructor(
    @InjectRepository(InvalidTransactionEntitty)
    private readonly repository: Repository<InvalidTransactionEntitty>,
  ) {}

  async create(params: InvalidTransaction[]): Promise<void> {
    await this.repository.save(params);
  }
}
