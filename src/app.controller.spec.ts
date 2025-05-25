// app.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

import { CreateTransacionsDTO } from './types/transaction.types';
import { TransactionsService } from './services/transactions/transactions.service';

describe('AppController', () => {
  let appController: AppController;
  let transactionsService: TransactionsService;

  beforeEach(async () => {
    const mockAppService = {
      CreateTransacions: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: TransactionsService, useValue: mockAppService }],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    transactionsService =
      moduleRef.get<TransactionsService>(TransactionsService);
  });

  describe('uploadFile', () => {
    it('tobe defined', async () => {
      expect(appController).toBeDefined();
    });
    it('deve chamar appService.CreateTransacions com o arquivo enviado', async () => {
      const mockFile = {
        originalname: 'test.csv',
        buffer: Buffer.from('some,csv,content'),
      } as Express.Multer.File;

      const expectedResult: CreateTransacionsDTO = {
        transactionsWithSucess: 10,
        invalidTransactions: 0,
      } as CreateTransacionsDTO;
      jest
        .spyOn(transactionsService, 'CreateTransacions')
        .mockResolvedValue(expectedResult);

      const result = await appController.uploadFile(mockFile);

      expect(transactionsService.CreateTransacions).toHaveBeenCalledWith(
        mockFile,
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
