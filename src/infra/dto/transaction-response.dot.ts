export type TransacionReposeDto = {
  transactionSuccess: number;
  transactionSuccessFail: number;
  transactionHasError: boolean;
  Errorreason?: InvalidTrasacsiont[];
};

export type InvalidTrasacsiont = {
  reasonNegativeError?: string;
  reasonDuplicateTransaction?: string;
};
