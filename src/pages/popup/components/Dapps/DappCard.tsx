import React from 'react';
import voteSvg from '@assets/img/Vote.svg';
export interface DappCardProps {
  icon?: string;
  title?: string;
}
export default function DappCard({ icon, title }: DappCardProps) {
  return (
    <a href="/src/pages/newtab/index.html" target="_blank" className="flex items-center zm-bg-card rounded-[2rem]">
      <div className="m-2 p-2 bg-white rounded-full">
        <img className="h-4 w-4" src={icon || voteSvg} alt="" />
      </div>
      <div className="py-2 pr-4 overflow-hidden">
        <div className="zm-message-title truncate">{title}</div>
      </div>
    </a>
  );
}
