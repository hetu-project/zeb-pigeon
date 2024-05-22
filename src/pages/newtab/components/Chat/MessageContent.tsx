// import useStorage from '@src/shared/hooks/useStorage';
// import keystoreStorage from '@src/shared/storages/keystoreStorage';
import MessageList from './Message/MessageList';
import { useMatch } from 'react-router-dom';
import { useContactByAddress } from '@root/src/shared/hooks/contacts';
import { PaperAirplaneIcon, TicketIcon, NoSymbolIcon } from '@heroicons/react/24/solid';
import { useCallback, useMemo } from 'react';
// import { Button } from '@chakra-ui/react';

import { useForm } from 'react-hook-form';
// import { useChatApi } from '@root/src/shared/hooks/chat';
import { useActiveAccount, useMessageList } from '@root/src/shared/hooks/accounts';
import messagesStorage from '@root/src/shared/storages/messageStorage';
import messagesSessionStorage from '@root/src/shared/storages/messageSessionStorage';
import { signChatMessage } from '@root/src/shared/account/sign';
import { messageStorageSortKey } from '@root/src/shared/account';
// import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useActiveNetwork, useNetworkList } from '@root/src/shared/hooks/network';
import useStorage from '@root/src/shared/hooks/useStorage';
import activeTargetNodeStorage from '@root/src/shared/storages/activeTargetNodeStorage';
import { ChatCommandFactory } from '@root/src/shared/command/chat';

type Inputs = {
  message: string;
};

export default function MessageContent() {
  const activeAccount = useActiveAccount();

  const { register, getValues, setValue } = useForm<Inputs>();
  // const chatApi = useChatApi();

  const match = useMatch('/chat/:address');
  const address = match?.params?.address;
  const contact = useContactByAddress(address);
  const activeNetwork = useActiveNetwork();

  const storageKey = useMemo(() => {
    return messageStorageSortKey(activeAccount?.address, contact?.address);
  }, [activeAccount?.address, contact?.address]);
  const networkNodeList = useNetworkList();

  const targetNodeKey = useStorage(activeTargetNodeStorage);

  const toNode = useMemo(() => {
    return (
      networkNodeList.find(node => {
        return node.name === targetNodeKey;
      }) || networkNodeList?.[0]
    );
  }, [networkNodeList, targetNodeKey]);

  const handleSend = useCallback(async () => {
    const message = getValues('message');
    if (!message) return;
    if (!activeAccount) return;
    if (!contact) return;
    if (!toNode?.agent) return;
    setValue('message', '');
    const mf = {
      from: activeAccount.address,
      to: contact.address,
      message,
      sign: '',
    };
    const signature = await signChatMessage(activeAccount, mf.message);
    // await chatApi.accountSendMessage(mf.from, mf.to, mf.message, activeNetwork?.agent, toNode?.agent, signature);
    chrome.runtime.sendMessage(
      ChatCommandFactory.sendMessage(mf.from, mf.to, mf.message, activeNetwork?.agent, toNode?.agent, signature),
    );

    messagesStorage.addMessage(storageKey, mf);
    messagesSessionStorage.updateSession(mf.from, { to: mf.to });
    return;
  }, [activeAccount, activeNetwork?.agent, contact, getValues, setValue, storageKey, toNode?.agent]);

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.code === 'Enter') {
        handleSend();
      }
    },
    [handleSend],
  );

  const messageList = useMessageList(activeAccount?.address, contact?.address);

  const clearMessage = useCallback(() => {
    messagesStorage.clearMessage(storageKey);
  }, [storageKey]);

  if (!contact) return <div></div>;

  return (
    <div className="flex flex-col h-full">
      <div className=" zm-bg-card h-20 flex items-center justify-between px-4 flex-shrink-0">
        <div className="flex items-center">
          <div className={' mx-2 my-2 px-2 py-2 bg-[#DADCE0] rounded-full'}>
            <TicketIcon className="w-10 h-10 text-[#9AA0A6]" />
          </div>
          <div className="mx-4">
            <div>{`${contact?.name}`}</div>
            <div>{`${contact?.address?.replace(' ', '').substring(0, 6)}`}</div>
          </div>
        </div>

        <div className="flex items-center">
          <div className={' mx-2 my-2 px-2 py-2 rounded-full'}>
            <NoSymbolIcon className="w-5 h-5 cursor-pointer text-[#9AA0A6]" onClick={clearMessage} />
          </div>
          {/* <div className="flex items-center ml-4">
            <div className="mr-2">Target Node:</div>
            <div>
              <Menu>
                <MenuButton>
                  <div className="w-40 flex justify-start truncate overflow-hidden">
                    {toNode ? toNode.name : 'Select'}
                  </div>
                </MenuButton>
                <MenuList className="flex flex-col gap-2 bg-black rounded-lg p-4">
                  {networkNodeList.map(net => {
                    return (
                      <MenuItem
                        key={net.name}
                        className=' p-1 hover:bg-[#4F52B2] rounded-sm"'
                        onClick={() => {
                          activeTargetNodeStorage.set(net.name);
                        }}>
                        {net.name}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
            </div>
          </div> */}
        </div>
      </div>
      <div className="flex-grow overflow-hidden flex flex-col justify-end">
        <MessageList list={messageList} />
      </div>
      <div className="flex items-center mb-3 mx-3 gap-3">
        <input
          {...register('message')}
          className=" input input-xs flex-grow zm-bg-card h-12 rounded-3xl flex items-center px-4"
          placeholder="Message......"
          onKeyUp={handleKeyUp}
        />
        <button className="h-12 w-12 rounded-full zm-bg-card flex items-center justify-center" onClick={handleSend}>
          <PaperAirplaneIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
