export type Transaction = {
  from: string;
  to: string;
  amount: string;
  suspect?: boolean;
};

export type InvalidTransaction = {
  from: string;
  to: string;
  amount: string;
  reason: 'Nevative value' | 'Duplicate';
  fileName?: string;
};

export type ValidationResult = {
  valid: Transaction[];
  invalid: InvalidTransaction[];
  quantityValid: number;
  quantityDuplicate: number;
  quantityNegative: number;
};

export type CreateTransacionsDTO = {
  transactionsWithSucess: number;
  invalidTransactions: number;
  sumaryInvalidTransacions?: InvalidTransaction[];
};
