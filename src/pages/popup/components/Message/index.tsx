import React from 'react';
import MessageCard from './MessageCard';
import { useSessionList } from '@root/src/shared/hooks/session';
import { useActiveAccount } from '@root/src/shared/hooks/accounts';
import NoData from '@root/src/shared/components/NoData';

export default function Message() {
  const activeAccount = useActiveAccount();
  const _sessionList = useSessionList(activeAccount?.address);
  console.log('sessionList', _sessionList);
  const sessionList = _sessionList;
  return (
    <div className="zm-bg-page flex flex-col gap-2 my-2">
      {sessionList.length > 0 ? (
        sessionList.map(session => {
          return <MessageCard key={session.to} to={session.to} from={activeAccount?.address} />;
        })
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <NoData />
        </div>
      )}
    </div>
  );
}
