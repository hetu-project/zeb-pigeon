import React from 'react';
import { TicketIcon } from '@heroicons/react/24/solid';
export default function MessageCard() {
  return (
    <a href="/src/pages/newtab/index.html" target="_blank" className="flex items-center zm-bg-card">
      <div className=" mx-4 my-2 px-2 py-2 bg-[#DADCE0]">
        <TicketIcon className="w-6 h-6 text-[#9AA0A6]" />
      </div>
      <div className="py-2 pr-4 overflow-hidden">
        <div className="zm-message-title text-base">{'friend1'}</div>
        <div className=" zm-message-description truncate text-sm">
          {'Supporting line text lorem ipsum dolor sit amet, consectetur.'}
        </div>
      </div>
    </a>
  );
}
