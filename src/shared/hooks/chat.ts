import { useContext } from 'react';
import { ChatApiContext } from '../provider/ChatApiProvider';

export const useChatApi = () => {
  const { api } = useContext(ChatApiContext);
  return api;
};
