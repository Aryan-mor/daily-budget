export enum CurrencyCode {
    USD = 'USD',
    EUR = 'EUR',
    TR = 'TR'
}

export const DefaultCurrencyCode = CurrencyCode.TR;

export type CurrencySymbol = '$' | '€' | '₺'

export interface Currency {
    code: CurrencyCode;
    label: string;
    symbol: CurrencySymbol;
}


const currencyGenerator = (code: CurrencyCode, label: string, symbol: CurrencySymbol) => ({
    code,
    label,
    symbol,
});


export const Currencies: Record<CurrencyCode, Currency> = {
    [CurrencyCode.USD]: currencyGenerator(CurrencyCode.USD, 'United States Dollar', '$'),
    [CurrencyCode.EUR]: currencyGenerator(CurrencyCode.EUR, 'Euro', '€'),
    [CurrencyCode.TR]: currencyGenerator(CurrencyCode.TR, 'Turkish Lira', '₺'),
};