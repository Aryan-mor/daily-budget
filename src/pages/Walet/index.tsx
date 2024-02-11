import useWallets from '../../hooks/use-wallets';
import { Button, Input } from '@nextui-org/react';
import { useCallback, useState } from 'preact/compat';
import {h} from "preact";

const Index = () => {
  const { wallet, onWalletChange } = useWallets();

  const [budget, setBudget] = useState(wallet.budget);
  const [dailyBudget, setDailyBudget] = useState(wallet.dailyBudget);

  const back = useCallback(() => {
    // route('/');
  }, []);

  const handleSave = useCallback(() => {
    onWalletChange({
      ...wallet,
      budget: budget ?? wallet.budget,
      dailyBudget: dailyBudget ?? wallet.dailyBudget,
    });
    back();
  }, [onWalletChange, wallet, budget, dailyBudget, back]);

  return (
    <div className="flex flex-col container mx-auto py-3 space-y-4">
      <div className="w-[200px]">
        <Input value={budget.toString()}
               onChange={(e) => e.target.value && setBudget(Number(e.target.value))}
               type="number" min="1"
               step="any"
               label="Budget" />
      </div>
      <div className="w-[200px]">
        <Input value={dailyBudget.toString()}
               onChange={(e) => e.target.value && setDailyBudget(Number(e.target.value))}
               type="number" min="1"
               step="any"
               label="Daily Budget" />
      </div>
      <div className="flex gap-4">
        <Button onClick={handleSave} type="button" color="success">
          Save
        </Button>
        <Button onClick={back} variant="bordered" type="button" color="primary">
          back
        </Button>
      </div>
    </div>
  );
};

export default Index;