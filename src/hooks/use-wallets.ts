import { useStorage } from './use-storage/use-storage';
import { Wallet } from '../interface/wallet';
import { CurrencyCode, DefaultCurrencyCode } from '../interface/currency.interface';
import { useCallback, useEffect, useMemo, useRef } from 'preact/compat';
import { useActiveCurrency } from './use-active-currency-code';
import useTransactions from './use-transactions';

const WALLET_KEY = 'WALLET';

const DefaultWallet: Wallet = {
  budget: 0,
  lastUpdate: new Date(),
  lastDailyBudgetUpdate: new Date(),
  dailyBudget: 0,
  currency: DefaultCurrencyCode,
};

const useWallets = (currencyCode?: CurrencyCode) => {
  const [activeCurrency] = useActiveCurrency();
  const currentCurrencyCode = useMemo(() => currencyCode ?? activeCurrency, [currencyCode, activeCurrency]);
  const defaultValue = useMemo<{ [K in CurrencyCode]?: Wallet; }>(
    () => ({
      [currentCurrencyCode]: {
        ...DefaultWallet,
        currency: currentCurrencyCode,
      },
    }),
    [currentCurrencyCode],
  );
  const [wallets, setWallets] = useStorage(WALLET_KEY, defaultValue);
  const [{ sumOfTransaction }] = useTransactions(currentCurrencyCode);
  const init = useRef(false);

  useEffect(() => {
    if (!wallets || init.current)
      return;
    init.current = true;
    const newWallets = { ...wallets };
    Object.values(wallets).forEach(({ currency, dailyBudget, lastDailyBudgetUpdate, budget }) => {
      const now = new Date();
      const differenceInDays =
        Math.round((now.getTime() - new Date(lastDailyBudgetUpdate).getTime()) / (1000 * 3600 * 24));

      const newBudget = budget + (dailyBudget * differenceInDays);

      newWallets[currency] = {
        currency,
        dailyBudget,
        budget: newBudget,
        lastUpdate: now,
        lastDailyBudgetUpdate: now,
      };
    });
    setWallets(newWallets);
  }, [wallets, setWallets]);

  const resetWallet = useCallback(() => {
    setWallets({
      ...wallets,
      ...defaultValue,
    });
  }, [setWallets, wallets, defaultValue]);

  const wallet = useMemo(() => wallets[currentCurrencyCode] ?? DefaultWallet, [wallets, currentCurrencyCode]);

  const handleWalletChange = useCallback((wallet: Wallet) => {
    setWallets({
      ...wallets,
      [currentCurrencyCode]: {
        ...wallet,
        lastUpdate: new Date(),
      },
    });
  }, [setWallets, wallets, currentCurrencyCode]);


  const handleBudgetChange = useCallback((newBudget: number) => {
    handleWalletChange({
      ...wallet,
      budget: newBudget + sumOfTransaction,
    });
  }, [handleWalletChange, wallet, sumOfTransaction]);

  const handleDailyBudgetUpdate = useCallback((dailyBudget: number) => {
    handleWalletChange({
      ...wallet,
      dailyBudget,
    });
  }, [handleWalletChange, wallet]);


  return {
    wallets,
    wallet,
    resetWallet,
    activeCurrency,
    onWalletChange: handleWalletChange,
    onBudgetChange: handleBudgetChange,
    onDailyBudgetUpdate: handleDailyBudgetUpdate,
  };
};
export default useWallets;
