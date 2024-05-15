import { TicketIcon } from '@heroicons/react/24/solid';
import { useActiveAccount, useMessageList } from '@root/src/shared/hooks/accounts';
import { useContactByAddress } from '@root/src/shared/hooks/contacts';
import { useSessionList } from '@root/src/shared/hooks/session';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
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
    <Link to={`/chat/${to}`} replace className="flex items-center bg-black bg-opacity-50 rounded-xl">
      <div className=" mx-2 my-2 px-2 py-2 bg-[#DADCE0] rounded-full">
        <TicketIcon className="w-6 h-6 text-[#9AA0A6]" />
      </div>
      <div className="py-4 pr-4 overflow-hidden">
        <div className="zm-message-title text-xs truncate">{name || contact?.name || to || ''}</div>
        <div className=" zm-message-description truncate text-xs h-4">{message || latestMessage?.message}</div>
      </div>
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
