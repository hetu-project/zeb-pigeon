import React, { useMemo } from 'react';
import { TicketIcon } from '@heroicons/react/24/solid';
import { useContactByAddress } from '@root/src/shared/hooks/contacts';
import { useMessageList } from '@root/src/shared/hooks/accounts';
export interface MessageCardProps {
  icon?: string;
  name?: string;
  from?: string;
  to?: string;
  message?: string;
}
export default function MessageCard({
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
    <a
      href={`/src/pages/newtab/index.html#/chat/${to}`}
      target="_blank"
      className="flex items-center zm-bg-card"
      rel="noreferrer">
      <div className=" mx-4 my-2 px-2 py-2 bg-[#DADCE0]">
        <TicketIcon className="w-6 h-6 text-[#9AA0A6]" />
      </div>
      <div className="py-2 pr-4 overflow-hidden">
        <div className="zm-message-title text-base truncate">{name || contact?.name || to || ''}</div>
        <div className=" zm-message-description truncate text-sm">{message || latestMessage?.message}</div>
      </div>
    </a>
  );
}
