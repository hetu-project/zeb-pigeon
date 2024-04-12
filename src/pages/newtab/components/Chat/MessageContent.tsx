// import useStorage from '@src/shared/hooks/useStorage';
// import keystoreStorage from '@src/shared/storages/keystoreStorage';
import MessageList from './Message/MessageList';
import { useMatch } from 'react-router-dom';
import { useContactByAddress } from '@root/src/shared/hooks/contacts';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useCallback , useEffect , useMemo } from 'react';
import { Button } from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
import { useChatApi } from '@root/src/shared/hooks/chat';
import { useActiveAccount, useMessageList } from '@root/src/shared/hooks/accounts';
import messagesStorage from '@root/src/shared/storages/messageStorage';

type Inputs = {
  message: string;
};

export default function MessageContent() {
  const activeAccount = useActiveAccount();

  const { register, getValues, setValue } = useForm<Inputs>();
  const chatApi = useChatApi();

  const match = useMatch('/chat/:address');
  const address = match?.params?.address;
  const contact = useContactByAddress(address);

  useEffect(() => {
    if (!chatApi || !address) return;
    chatApi.nodeConnectNode(address);
  }, [address, chatApi]);

  useEffect(() => {
    if (!chatApi || !address) return;
    chatApi.accountPullMessage();
  }, [address, chatApi]);
  const storageKey = useMemo(() => {
    return `${activeAccount?.address}_${contact?.address}`;
  }, [activeAccount?.address, contact?.address]);

  const handleSend = useCallback(async () => {
    const message = getValues('message');
    if (!message) return;
    if (!activeAccount) return;
    if (!contact) return;

    console.log('handleSend', message);
    setValue('message', '');
    const mf = {
      from: activeAccount.address,
      to: contact.address,
      message,
      sign: '',
    };
    await chatApi.accountSendMessage(mf.from, mf.to, mf.message);

    await chatApi.accountSendMessage(mf.to, mf.from, mf.message);
    messagesStorage.addMessage(storageKey, mf);
    return;
  }, [activeAccount, chatApi, contact, getValues, setValue, storageKey]);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.code === 'Enter') {
        handleSend();
      }
    },
    [handleSend],
  );

  const messageList = useMessageList(activeAccount?.address, contact?.address);

  console.log('messageList', messageList);

  if (!contact) return <div></div>;

  return (
    <div className="flex flex-col h-full">
      <div className=" zm-bg-card h-20 flex items-center px-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-[#1F1D1D]"></div>
          <div className="mx-4">
            <div>{`${contact?.name}`}</div>
            <div>{`${contact?.address?.replace(' ', '').substring(0, 6)}`}</div>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-scroll flex flex-col justify-end">
        <MessageList list={messageList} />
      </div>
      <div className="flex items-center mb-3 mx-3 gap-3">
        <div className="h-12 rounded-3xl zm-bg-card flex items-center px-4 flex-grow">
          <input
            {...register('message')}
            className=" input input-xs bg-transparent flex-grow h-full"
            placeholder="Message......"
            onKeyUp={handleKeyUp}
          />
        </div>
        <Button className="h-12 w-12 rounded-full zm-bg-card flex items-center justify-center" onClick={handleSend}>
          <PaperAirplaneIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
