import React, { useCallback, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate, useMatch } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import accountStorage from '@root/src/shared/storages/accountStorage';
import { useAccountFromAddress } from '@root/src/shared/hooks/accounts';

type Inputs = {
  name: string;
};
export default function AccountForm() {
  const { register, getValues, setValue } = useForm<Inputs>();
  const navigate = useNavigate();
  const match = useMatch('/setting/account/edit/:address');
  const account = useAccountFromAddress(match?.params?.address);
  const initParams = useCallback(() => {
    if (account) {
      setValue('name', account.name);
    }
  }, [account, setValue]);
  useEffect(() => {
    initParams();
  }, [initParams]);
  const handleSave = useCallback(async () => {
    const name = getValues('name');
    if (!name || !account) return;
    await accountStorage.update(account?.address, {
      ...account,
      name,
    });
    navigate(-1);
  }, [account, getValues, navigate]);
  return (
    <div className="relative">
      <div className="flex items-center text-xl">
        <button
          className="w-12 h-12 flex items-center justify-center"
          onClick={() => {
            navigate(-1);
          }}>
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div>{match ? 'Edit Account' : 'Edit Account'}</div>
      </div>
      <div className="flex flex-col gap-4 mt-10 px-2">
        <div className="">
          <div>{'Address:'}</div>
          <div className="w-full input input-sm border zm-bg-card overflow-hidden truncate">
            {account?.address || ''}
          </div>
        </div>
        <div className="">
          <div>{'Name:'}</div>
          <input className="w-full input input-sm border zm-bg-card" {...register('name')} />
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-7">
        <Button
          className=" zm-bg-card rounded-3xl font-medium px-6 py-3 w-28 opacity-50"
          onClick={() => {
            navigate(-1);
          }}>
          Cancel
        </Button>
        <Button className=" zm-bg-card rounded-3xl font-medium px-6 py-3 w-28" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
