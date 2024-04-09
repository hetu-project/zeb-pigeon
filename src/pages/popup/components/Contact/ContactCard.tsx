import React from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
export default function ContactCard() {
  return (
    <a href="/src/pages/newtab/index.html" target="_blank" className="flex items-center zm-bg-card">
      <div className="p-4">
        <UserIcon strokeWidth={2.5} className="w-4 h-4 zm-text-description font-bold" />
      </div>
      <div className="py-2 pr-4 overflow-hidden">
        <div className="zm-message-title text-base">{'friend1'}</div>
      </div>
    </a>
  );
}
