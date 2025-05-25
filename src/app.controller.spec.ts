// app.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateTransacionsDTO } from './types/transaction.types';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const mockAppService = {
      CreateTransacions: jest.fn(),
    };

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: mockAppService }],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
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
        .spyOn(appService, 'CreateTransacions')
        .mockResolvedValue(expectedResult);

      const result = await appController.uploadFile(mockFile);

      expect(appService.CreateTransacions).toHaveBeenCalledWith(mockFile);
      expect(result).toEqual(expectedResult);
    });
  });
});
