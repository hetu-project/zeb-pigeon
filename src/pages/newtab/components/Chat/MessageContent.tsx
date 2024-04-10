import useStorage from '@src/shared/hooks/useStorage';
import keystoreStorage from '@src/shared/storages/keystoreStorage';
import MessageList from './Message/MessageList';

export default function MessageContent() {
  const mainAccount = useStorage(keystoreStorage);
  return (
    <div className="flex flex-col h-full">
      <div className=" zm-bg-card h-20 flex items-center px-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-[#1F1D1D]"></div>
          <div className="mx-4">
            <div>{`${mainAccount.replace(' ', '').substring(0, 6)}`}</div>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-scroll flex flex-col justify-end">
        <MessageList />
      </div>
      <div className="h-12 rounded-3xl zm-bg-card mb-3 mx-3 flex items-center px-4">
        <input className=" input input-xs bg-transparent flex-grow h-full" placeholder="Message......" />
      </div>
    </div>
  );
}
