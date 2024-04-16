import { useMemo } from 'react';
import messageSessionStorage from '../storages/messageSessionStorage';
import useStorage from './useStorage';

export const useSessionList = (address: string) => {
  const sessionsMap = useStorage(messageSessionStorage);
  return useMemo(() => {
    return Object.entries(sessionsMap?.[address] || {}).map(([, v]) => v);
  }, [address, sessionsMap]);
};
