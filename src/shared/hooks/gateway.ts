import useSWR from 'swr';
import { rpcFetcher } from '../gateway/rpc';

export const useGateWayMessage = (messageId: string) => {
  return useSWR(`/gateway/message/${messageId}`, rpcFetcher);
};
