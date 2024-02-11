import {h} from 'preact'
import {
  createContext,
  FunctionComponent,
  useContext,
  useState,
} from 'preact/compat';
import { CurrencyCode, DefaultCurrencyCode } from '../interface/currency.interface';
import useMainCurrency from './use-main-currency';
import { StateUpdater } from 'preact/hooks';

const ActiveCurrency = createContext<[CurrencyCode, StateUpdater<CurrencyCode>]>([
  DefaultCurrencyCode,
  undefined,
] as [CurrencyCode, StateUpdater<CurrencyCode>]);

const ActiveCurrencyContextWrapper: FunctionComponent = ({ children }) => {
  const [mainCurrencyCode] = useMainCurrency();
  const state = useState(mainCurrencyCode);
  return <ActiveCurrency.Provider value={state}>{children}</ActiveCurrency.Provider>;
};
export default ActiveCurrencyContextWrapper;
export const useActiveCurrency = () => {
  return useContext(ActiveCurrency);
};
