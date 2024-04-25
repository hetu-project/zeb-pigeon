import React, { ReactNode, FC, createContext, useMemo, useState, useEffect, useCallback } from 'react';
import ChatApi from '../client/ChatApi';
import WsProvider from '../client/provider/WsProvider';
import { useActiveAccount } from '../hooks/accounts';
import { useActiveNetwork } from '../hooks/network';
import messagesStorage from '../storages/messageStorage';
import { ZMessage } from '@root/src/proto/zmessage';
import { u8aToString } from '../utils';
import { ChatMessage } from '@root/src/proto/ChatMessage';
import { messageStorageSortKey } from '../account';
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
  const handleReceiveMessage = useCallback(
    async (message: ZMessage) => {
      if (!activeAccount) return;
      const chatMessage = ChatMessage.decode(message.data);
      const from = u8aToString(message.from);
      // const to = u8aToString(message.to);
      const to = activeAccount?.address;

      const key = messageStorageSortKey(from, to);

      const textMessage = u8aToString(chatMessage.data);

      // console.log('handleReceiveMessage', message, chatMessage);

      const receiveMessage = {
        from,
        to: activeAccount?.address,
        message: textMessage,
        sign: '',
      };
      console.log('handleReceiveMessage', message);
      console.log('handleReceiveMessage', chatMessage);
      console.log('handleReceiveMessage', receiveMessage);

      await messagesStorage.addMessage(key, receiveMessage);
    },
    [activeAccount],
  );
  useEffect(() => {
    if (!api) return;
    if (!activeAccount?.address) return;
    api.accountSubscribeMessage(handleReceiveMessage as never);
  }, [activeAccount?.address, api, handleReceiveMessage]);
  return <ChatApiContext.Provider value={value}>{children}</ChatApiContext.Provider>;
};

export default ChatApiProvider;
