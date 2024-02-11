import { useStorage } from './use-storage/use-storage';
import { DefaultCurrencyCode } from '../interface/currency.interface';

const MAIN_CURRENCY_KEY = 'MAIN_CURRENCY';

const useMainCurrency = () => {
  return useStorage(MAIN_CURRENCY_KEY, DefaultCurrencyCode);
};
export default useMainCurrency;
