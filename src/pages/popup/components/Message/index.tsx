import React from 'react';
import MessageCard from './MessageCard';
import { useSessionList } from '@root/src/shared/hooks/session';
import { useActiveAccount } from '@root/src/shared/hooks/accounts';

export default function Message() {
  const activeAccount = useActiveAccount();
  const sessionList = useSessionList(activeAccount?.address);
  console.log('sessionList', sessionList);
  return (
    <div className="zm-bg-page flex flex-col gap-2 my-2 overflow-y-scroll">
      {sessionList.map(session => {
        return <MessageCard key={session.to} to={session.to} from={activeAccount?.address} />;
      })}
    </div>
  );
}
