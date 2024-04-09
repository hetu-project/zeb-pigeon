import React, { useCallback } from 'react';
import keystoreStorage from '@root/src/shared/storages/keystoreStorage';
import accountStorage from '@root/src/shared/storages/accountStorage';
import { useNavigate } from 'react-router-dom';
import useStorage from '@root/src/shared/hooks/useStorage';
import AccountCard from './AccountCard';
import NetworkManage from './NetworkManage';

export default function Account() {
  const keystoreSeeds = useStorage(keystoreStorage);
  const navigate = useNavigate();
  const handleRemove = useCallback(async () => {
    const account = await keystoreStorage.get();
    await accountStorage.remove(account);
    await accountStorage.set({});
    await keystoreStorage.remove();
    const accounts = await accountStorage.get();
    if (Object.keys(accounts || {}).length === 0) {
      navigate('/');
    }
  }, [navigate]);
  return (
    <div className=" flex flex-col">
      <div className="mt-6">
        <AccountCard name="Account" address={keystoreSeeds} onSetting={handleRemove} />
      </div>
      <div></div>
      <div className="mt-12">
        <NetworkManage />
      </div>
    </div>
  );
}
