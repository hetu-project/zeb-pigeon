import { TicketIcon } from '@heroicons/react/24/solid';
import { useActiveAccount, useMessageList } from '@root/src/shared/hooks/accounts';
import { useContactByAddress } from '@root/src/shared/hooks/contacts';
import { useSessionList } from '@root/src/shared/hooks/session';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import SessionMenuContext from './SessionMenuContext';
export interface MessageCardProps {
  icon?: string;
  name?: string;
  from?: string;
  to?: string;
  message?: string;
}
export function MessageCard({
  // icon,
  from,
  to,
  name,
  message,
}: MessageCardProps) {
  const contact = useContactByAddress(to);
  const messageList = useMessageList(from, contact?.address);

  const latestMessage = useMemo(() => {
    return messageList[messageList.length - 1];
  }, [messageList]);

  return (
    <Link to={`/chat/${to}`} replace className="bg-black bg-opacity-50 rounded-xl">
      <SessionMenuContext from={from} to={to} className="flex-grow w-full">
        <div className="flex-grow flex items-center">
          <div className=" mx-2 my-2 px-2 py-2 bg-[#DADCE0] rounded-full">
            <TicketIcon className="w-6 h-6 text-[#9AA0A6]" />
          </div>
          <div className="py-4 pr-4 overflow-hidden flex-grow text-left">
            <div className="zm-message-title text-xs truncate">{name || contact?.name || to || ''}</div>
            <div className=" zm-message-description truncate text-xs h-4">{message || latestMessage?.message}</div>
          </div>
        </div>
      </SessionMenuContext>
    </Link>
  );
}

export default function AllChatList() {
  const activeAccount = useActiveAccount();
  const sessionList = useSessionList(activeAccount?.address);
  return (
    <div className="flex flex-col h-full overflow-hidden gap-3">
      {sessionList.map(session => {
        return <MessageCard key={session.to} to={session.to} from={activeAccount?.address} />;
      })}
    </div>
  );
}
