import React from 'react';
import MessageCard from './MessageCard';

export default function Message() {
  return (
    <div className="zm-bg-page flex flex-col gap-2 my-2 overflow-y-scroll">
      <MessageCard />
      <MessageCard />
      <MessageCard />
    </div>
  );
}
