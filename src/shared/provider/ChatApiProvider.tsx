import React, { ReactNode, FC, createContext, useMemo, useState, useEffect , useCallback } from 'react';
import ChatApi from '../client/ChatApi';
import WsProvider from '../client/provider/WsProvider';
import { useActiveAccount } from '../hooks/accounts';
import { useActiveNetwork } from '../hooks/network';
import messagesStorage from '../storages/messageStorage';
export interface ChatApiContextProps {
  api?: ChatApi;
  setEndpoints?: (endpoints: string | string[]) => void;
}

export const ChatApiContext = createContext<ChatApiContextProps>({});

interface ChatApiProviderProps {
  endpoints?: string | string[];
  children: ReactNode;
}
const ChatApiProvider: FC<ChatApiProviderProps> = ({ children }) => {
  const [api, setApi] = useState<ChatApi | undefined>();
  const activeNetwork = useActiveNetwork();
  const endpoints = useMemo(() => {
    return activeNetwork?.url;
  }, [activeNetwork?.url]);
  // const [endpoints, setEndpoints] = useState<string | string[]>('ws://52.221.181.98:8080');

  const activeAccount = useActiveAccount();

  useEffect(() => {
    const wsProvider = new WsProvider(endpoints);
    const chatApi = new ChatApi({
      provider: wsProvider,
    });
    setTimeout(() => {
      setApi(chatApi);
    }, 1000);
    return () => {};
  }, [endpoints]);
  const value = useMemo(() => {
    return {
      api,
      // setEndpoints,
    };
  }, [api]);

  // get bootstrap node
  useEffect(() => {
    if (!api) return;
    api.bootstrapGetNode();
  }, [activeAccount?.address, api]);

  // login
  useEffect(() => {
    if (activeAccount?.address && api) {
      console.log(api);
    }
    return () => {};
  }, [activeAccount?.address, api]);
  const handleReceiveMessage = useCallback(
    async (message: unknown) => {
      if (!activeAccount) return;
      console.log('handleReceiveMessage', message);
      const from = activeAccount?.address;
      const to = '02944ffd4c3be04908d962fa3622b776e167933149ebca1aeed905455640a8a2bc';
      const key = `${from}_${to}`;
      await messagesStorage.addMessage(key, {
        from: '02944ffd4c3be04908d962fa3622b776e167933149ebca1aeed905455640a8a2bc',
        to: activeAccount?.address,
        message: message as string,
        sign: '',
      });
    },
    [activeAccount],
  );
  useEffect(() => {
    if (!api) return;
    if (!activeAccount?.address) return;
    api.accountSubscribeMessage(handleReceiveMessage);
  }, [activeAccount?.address, api, handleReceiveMessage]);
  return <ChatApiContext.Provider value={value}>{children}</ChatApiContext.Provider>;
};

export default ChatApiProvider;
