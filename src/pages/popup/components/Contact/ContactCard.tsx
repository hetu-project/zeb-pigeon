import React from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
export interface ContactCardProps {
  name?: string;
  address?: string;
}
export default function ContactCard({ name, address }: ContactCardProps) {
  return (
    <a
      href={`/src/pages/newtab/index.html#/chat/${address}`}
      target="_blank"
      className="flex items-center zm-bg-card"
      rel="noreferrer">
      <div className="p-4">
        <UserIcon strokeWidth={2.5} className="w-4 h-4 zm-text-description font-bold" />
      </div>
      <div className="py-2 pr-4 overflow-hidden">
        <div className="zm-message-title text-base">{name || address?.substring(0, 6)}</div>
        <div className=" zm-text-description text-xs">{address?.substring(0, 6)}</div>
      </div>
    </a>
  );
}
