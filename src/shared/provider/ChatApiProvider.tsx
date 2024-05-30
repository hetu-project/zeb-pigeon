import React, { ReactNode, FC, createContext, useMemo, useState, useEffect } from 'react';
import ChatApi from '../client/ChatApi';
import { useActiveAccount } from '../hooks/accounts';
import { useActiveNetwork } from '../hooks/network';
// import { ChatCommandFactory } from '../command/chat';
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
  const [api] = useState<ChatApi | undefined>();
  const activeNetwork = useActiveNetwork();
  const endpoints = useMemo(() => {
    return activeNetwork?.url;
  }, [activeNetwork?.url]);
  // const [endpoints, setEndpoints] = useState<string | string[]>('ws://52.221.181.98:8080');

  const activeAccount = useActiveAccount();

  useEffect(() => {
    // const wsProvider = new WsProvider(endpoints);
    // const chatApi = new ChatApi({
    //   provider: wsProvider,
    // });
    // chrome.runtime.sendMessage(ChatCommandFactory.changeEndpoint(endpoints));
    setTimeout(() => {
      // setApi(chatApi);
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
  // useEffect(() => {
  //   if (!api) return;
  //   api.bootstrapGetNode();
  // }, [activeAccount?.address, api]);

  // login
  useEffect(() => {
    if (activeAccount?.address && api) {
      console.log(api);
    }
    return () => {};
  }, [activeAccount?.address, api]);
  useEffect(() => {
    if (!api) return;
    if (!activeAccount?.address) return;
    // api.accountSubscribeMessage(handleReceiveMessage as never);
  }, [activeAccount?.address, api]);
  return <ChatApiContext.Provider value={value}>{children}</ChatApiContext.Provider>;
};

export default ChatApiProvider;
