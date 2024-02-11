import useWallets from '../../hooks/use-wallets';
import {Currencies, Currency} from '../../interface/currency.interface';
import {Button, Input, Select, SelectItem, Textarea} from '@nextui-org/react';
import useTransactions from '../../hooks/use-transactions';
import {useActiveCurrency} from '../../hooks/use-active-currency-code';
import {useState} from 'preact/compat';
import Icons from '../../components/icons';
import clsx from 'clsx';
import {h} from "preact";

function Home() {
    const {wallet} = useWallets();
    const [activeCurrency, onActiveCurrencyChange] = useActiveCurrency();
    const [{
        sumOfTransaction,
        transactions,
    }, addTransactions, onRemoveTransaction, onRemoveAllTransactions] = useTransactions();
    const [price, setPrice] = useState<number | undefined>();
    const [text, setText] = useState<string>('');
    const [activeIcon, setActiveIcon] = useState<string | undefined>();

    return (
        <div className="flex flex-col container mx-auto py-3 space-y-4">
            <div className="flex my-8 gap-5">
                <a href="/walet" className="text w-fit text-white bg-blue-400 p-4 rounded-md ">
                    Wallet:
                    <span
                        className="ml-3 mr-0.5 text-3xl font-semibold">
            {wallet.budget - sumOfTransaction}
          </span>
                    {Currencies[wallet.currency].symbol}
                </a>
                <div className="w-full">
                    <Select
                        label="Select an currency"
                        selectedKeys={activeCurrency}
                        className="max-w-xs"
                        renderValue={() => `${Currencies[activeCurrency].symbol} ${Currencies[activeCurrency].label}`}
                        onChange={(event) => onActiveCurrencyChange(event.target.value as Currency['code'])}
                    >
                        {Object.values(Currencies).map((currency) => (
                            <SelectItem className="flex items-center" key={currency.code} value={currency.code}>
                                <span
                                    className="text-blue-600 text-xl font-semibold mr-2">{currency.symbol}</span> {currency.label}
                            </SelectItem>
                        ))}
                    </Select>
                </div>
            </div>
            <div className="w-[200px]">
                <Input value={price?.toString()}
                       onChange={(e) => e.target.value && setPrice(Number(e.target.value))}
                       type="number" min="1"
                       step="any"
                       label="price" />
            </div>
            <Icons activeIcon={activeIcon} onActiveIconChange={setActiveIcon} />
            <div className="w-[400px]">
                <Textarea
                    value={text}
                    label="Description"
                    placeholder="Enter your description"
                    className="max-w-xs"
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className="flex space-x-3">
                <Button
                    onClick={() => {
                        if (!price || price <= 0 || !activeIcon)
                            return;
                        addTransactions({
                            text,
                            price,
                            icon: activeIcon,
                        });
                        setText('');
                        setPrice(undefined);
                        setActiveIcon(undefined);
                    }}>
                    Add transaction
                </Button>
                <Button onClick={onRemoveAllTransactions}>
                    Remove All transactions
                </Button>
            </div>
            <div className="flex flex-col space-y-3 h-[300px] overflow-y-auto overflow-x-hidden">
                {transactions.slice().reverse().map((transaction) => (
                    <div key={transaction.id} className="flex items-center text-white text-lg space-x-2">
            <span
                className={clsx('text-xl', transaction.icon)} />
                        <span className="font-semibold bg-blue-600/60 px-2 py-1 rounded-md">
              {transaction.price} {Currencies[activeCurrency].symbol}
            </span>
                        <span className="">
             {transaction.text}
            </span>
                        <Button size="sm"
                                isIconOnly
                                color="danger"
                                variant="faded"
                                aria-label="Remove"
                                onClick={() => onRemoveTransaction(transaction.id)}>
                            <span className="text-2xl icon-[solar--trash-bin-minimalistic-2-outline]" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
