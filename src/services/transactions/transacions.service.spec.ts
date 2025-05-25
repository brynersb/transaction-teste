// transactions.service.spec.ts

import { TransactionsService } from './transactions.service';
import * as XLSX from 'xlsx';

describe('TransactionsService', () => {
  const mockUsecase = { execute: jest.fn() };
  const service = new TransactionsService(mockUsecase as any);

  it('should read an Excel file and pass it to the use case', async () => {
    const transactions = [{ from: 'A', to: 'B', amount: 100 }];
    const sheet = XLSX.utils.json_to_sheet(transactions);
    const workbook = { Sheets: { Plan1: sheet }, SheetNames: ['Plan1'] };
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    const file = { buffer, originalname: 'teste.xlsx' } as Express.Multer.File;

    mockUsecase.execute.mockResolvedValue({ mock: 'response' });

    const result = await service.CreateTransacions(file);

    expect(mockUsecase.execute).toHaveBeenCalledWith(
      transactions,
      'teste.xlsx',
    );
    expect(result).toEqual({ mock: 'response' });
  });

  it('should throw error if there are no transactions in Excel', async () => {
    const emptySheet = XLSX.utils.json_to_sheet([]);
    const workbook = { Sheets: { Plan1: emptySheet }, SheetNames: ['Plan1'] };
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    const file = { buffer, originalname: 'vazio.xlsx' } as Express.Multer.File;

    await expect(service.CreateTransacions(file)).rejects.toThrow(
      'No transactions found in the file',
    );
  });
});
