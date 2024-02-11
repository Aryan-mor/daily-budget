import { useStorage } from './use-storage/use-storage';
import { CurrencyCode } from '../interface/currency.interface';
import { Transaction } from '../interface/transactions.inerface';
import { useCallback } from 'preact/compat';
import { useActiveCurrency } from './use-active-currency-code';

const TRANSACTIONS_KEY = 'TRANSACTIONS';

const defaultTransactions: { sumOfTransaction: number, transactions: Transaction[] } = {
  sumOfTransaction: 0,
  transactions: [],
};

type ReturnType = [
  transactions: { sumOfTransaction: number, transactions: Transaction[] },
  onAddTransaction:(transaction: Omit<Transaction, 'id' | 'createAt'>) => void,
  onRemoveTransaction:(transaction: Transaction['id']) => void,
  onAllTransactions:() => void,
];
const useTransactions = (currencyCode?: CurrencyCode) => {
  const [activeCurrency] = useActiveCurrency();
  const [transactions, onTransactionsChange] = useStorage(
    TRANSACTIONS_KEY + (currencyCode ?? activeCurrency),
    defaultTransactions,
  );

  const handleAddTransaction = useCallback(
    (transaction: Omit<Transaction, 'id' | 'createAt'>) => {
      onTransactionsChange({
        transactions: [
          ...transactions.transactions,
          {
            ...transaction,
            id: (transactions.transactions[transactions.transactions.length - 1]?.id ?? 0) + 1,
            createAt: new Date(),
          },
        ],
        sumOfTransaction: transaction.price + transactions.sumOfTransaction,
      });
    },
    [onTransactionsChange, transactions.sumOfTransaction, transactions.transactions],
  );

  const handleRemoveTransaction = useCallback(
    (id: Transaction['id']) => {
      const newTransactions = [...transactions.transactions];
      const transactionIndex = transactions.transactions.findIndex((t) => t.id === id);
      newTransactions.splice(transactionIndex, 1);
      onTransactionsChange({
        transactions: newTransactions,
        sumOfTransaction: transactions.sumOfTransaction - transactions.transactions[transactionIndex].price,
      });
    },
    [onTransactionsChange, transactions.sumOfTransaction, transactions.transactions],
  );

  const removeAllTransactions = useCallback(() => {
    onTransactionsChange(defaultTransactions);
  }, [onTransactionsChange]);

  return [transactions, handleAddTransaction, handleRemoveTransaction, removeAllTransactions] as ReturnType;
};
export default useTransactions;
