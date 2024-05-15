import React, { useCallback, useMemo } from 'react';
import keystoreStorage from '@root/src/shared/storages/keystoreStorage';
import accountStorage from '@root/src/shared/storages/accountStorage';
import { useNavigate } from 'react-router-dom';
import useStorage from '@root/src/shared/hooks/useStorage';
import AccountCard from './AccountCard';
import NetworkManage from './NetworkManage';
import PointCard from './PointCard';

export default function Account() {
  const keystoreSeeds = useStorage(keystoreStorage);
  const allAccount = useStorage(accountStorage);

  const activeAccount = useMemo(() => {
    return allAccount[keystoreSeeds];
  }, [allAccount, keystoreSeeds]);
  const navigate = useNavigate();
  const handleSetting = useCallback(() => {
    navigate('/side/account');
  }, [navigate]);
  return (
    <div className=" flex flex-col">
      <div className="mt-6">
        <AccountCard name={activeAccount?.name} address={activeAccount?.address} onSetting={handleSetting} />
      </div>
      <div className="mt-6">
        <PointCard name={activeAccount?.name} address={activeAccount?.address} />
      </div>
      <div></div>
      <div className="mt-12">
        <NetworkManage />
      </div>
    </div>
  );
}
