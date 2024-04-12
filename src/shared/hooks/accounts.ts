import { useMemo } from 'react';
import accountStorage, { Account } from '../storages/accountStorage';
import keystoreStorage from '../storages/keystoreStorage';
import useStorage from './useStorage';
import messagesStorage from '../storages/messageStorage';

export const useActiveAccount = (): Account | undefined => {
  const mainAccount = useStorage(keystoreStorage);

  const allAccount = useStorage(accountStorage);

  const activeAccount: Account | undefined = useMemo(() => {
    if (!allAccount[mainAccount]) return undefined;
    return allAccount[mainAccount];
  }, [allAccount, mainAccount]);

  return activeAccount;
};

export const useMessageList = (from: string, to: string) => {
  const allMessage = useStorage(messagesStorage);
  const list = useMemo(() => {
    return allMessage[`${from}_${to}`] || [];
  }, [allMessage, from, to]);
  return list;
};
