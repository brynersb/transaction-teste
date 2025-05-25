export type Transaction = {
  from: string;
  to: string;
  amount: string;
  suspect?: boolean;
  created_at: Date;
};

export type InvalidTransaction = {
  from: string;
  to: string;
  amount: string;
  reason: 'Nevative value' | 'Duplicate';
  fileName?: string;
  created_at: Date;
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
