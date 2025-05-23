import { Inject, Injectable } from '@nestjs/common';
import { TransactionRepositoryInterface } from './infra/repositories/transaction.respotiroty.interface';
import { TransactionEntity } from './infra/entities/transaction.entity';
import * as XLSX from 'xlsx';
import { TransactionCreate } from './types/transaction.types';
import { TransactionRepository } from './infra/repositories/transaction.repository';

@Injectable()
export class AppService {
  constructor(
    @Inject(TransactionRepository)
    private readonly repository: TransactionRepositoryInterface,
  ) {}

  async CreateTransacions(
    file: Express.Multer.File,
  ): Promise<TransactionEntity[]> {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheets = workbook.Sheets;
    const sheetName = workbook.SheetNames;

    const parsedToJson = XLSX.utils.sheet_to_json<TransactionCreate>(
      sheets[sheetName[0]],
    );
    console.log(`sem os negativos ${parsedToJson.length}`);
    this.validationsRowsNegative(parsedToJson);
    return await this.repository.create(parsedToJson);
  }

  validationsRowsNegative(data: TransactionCreate[]) {
    const result = data.filter((e) => +e.amount > 0);
    console.log(`sem os negativos${result.length}`);
    return result;
  }
}
