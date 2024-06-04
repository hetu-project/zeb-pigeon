import { useMemo } from 'react';
import messagesGraphStorage from '../storages/messagesGraphStorage';
import useStorage from './useStorage';

export const useMessageGraph = (messageId: string) => {
  const graphMap = useStorage(messagesGraphStorage);
  return useMemo(() => {
    return graphMap[messageId];
  }, [graphMap, messageId]);
};
