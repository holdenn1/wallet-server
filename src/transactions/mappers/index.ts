import { Transaction } from 'src/transactions/entities/transaction.entity';
import { TransactionToProfile } from '../types';
import { mapToUserProfile } from 'src/auth/mappers';

export const mapTransactionsToProfile = (transactions: Transaction[]): TransactionToProfile[] => {
  return transactions.map((transaction) => ({
    id: transaction.id,
    type: transaction.type,
    paymentMethod: transaction.paymentMethod,
    amount: transaction.amount,
    recipient: transaction.recipient,
    description: transaction.description,
    category: transaction.category,
    subcategory: transaction.subcategory,
    createAt: transaction.createAt,
    creditCard: transaction.creditCard
  }));
};

export const mapTransactionToProfile = (transaction: Transaction): TransactionToProfile => ({
  id: transaction.id,
  type: transaction.type,
  paymentMethod: transaction.paymentMethod,
  amount: transaction.amount,
  recipient: transaction.recipient,
  description: transaction.description,
  category: transaction.category,
  subcategory: transaction.subcategory,
  createAt: transaction.createAt,
  creditCard: transaction.creditCard,
  user: mapToUserProfile(transaction.user)
});
