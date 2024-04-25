import { useMemo } from 'react';
import accountStorage, { Account } from '../storages/accountStorage';
import keystoreStorage from '../storages/keystoreStorage';
import useStorage from './useStorage';
import messagesStorage from '../storages/messageStorage';
import { useSessionList } from './session';
import { messageStorageSortKey } from '../account';

export const useActiveAccount = (): Account | undefined => {
  const mainAccount = useStorage(keystoreStorage);

  const allAccount = useStorage(accountStorage);

  const activeAccount: Account | undefined = useMemo(() => {
    if (!allAccount[mainAccount]) return undefined;
    return allAccount[mainAccount];
  }, [allAccount, mainAccount]);

  return activeAccount;
};

export const useAccountFromAddress = (address: string): Account | undefined => {
  const allAccount = useStorage(accountStorage);

  const account: Account | undefined = useMemo(() => {
    if (!allAccount[address]) return undefined;
    return allAccount[address];
  }, [allAccount, address]);

  return account;
};

export const useMessageList = (from: string, to: string) => {
  const allMessage = useStorage(messagesStorage);
  const list = useMemo(() => {
    const key = messageStorageSortKey(from, to);
    return allMessage[key] || [];
  }, [allMessage, from, to]);
  return list;
};

export const useMessageCount = () => {
  const mainAccount = useStorage(keystoreStorage);
  const allMessage = useSessionList(mainAccount);
  const count = useMemo(() => {
    return 0;
    return allMessage.length;
  }, [allMessage.length]);
  return count;
};
