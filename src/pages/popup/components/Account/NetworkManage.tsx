import React from 'react';
import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
export default function NetworkManage() {
  return (
    <Link to={'/side/network'} className="flex items-center zm-bg-card p-2">
      <div className=" mr-2">
        <GlobeAltIcon className="w-10 h-10 zm-text-title" />
      </div>
      <div className="py-2 pr-4 overflow-hidden">
        <div className="zm-message-title text-base">{'Network Manage'}</div>
      </div>
    </Link>
  );
}
