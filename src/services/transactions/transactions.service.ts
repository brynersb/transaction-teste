import { Inject, Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { CreateTransacionsUsecaseInterface } from '../../useCases/create-transactions-usecase.interface';
import {
  CreateTransacionsDTO,
  Transaction,
} from '../../types/transaction.types';

@Injectable()
export class TransactionsService {
  constructor(
    @Inject('CreateTransacionsUsecaseInterface')
    private readonly usecase: CreateTransacionsUsecaseInterface,
  ) {}

  async CreateTransacions(
    file: Express.Multer.File,
  ): Promise<CreateTransacionsDTO> {
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheets = workbook.Sheets;
    const sheetName = workbook.SheetNames;

    const parsedToJson = XLSX.utils
      .sheet_to_json<Transaction>(sheets[sheetName[0]])
      .map((e) => ({ ...e, created_at: new Date() }));

    if (parsedToJson.length === 0) {
      throw new Error('No transactions found in the file');
    }
    return await this.usecase.execute(parsedToJson, file?.originalname);
  }
}
