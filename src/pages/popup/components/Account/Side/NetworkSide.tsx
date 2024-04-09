import React from 'react';
import {
  UserIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  ArchiveBoxXMarkIcon,
  DocumentIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
export const NetworkItem = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 gap-4">
      <div>
        <UserIcon className="w-5 h-5" />
      </div>
      <div className="flex-grow">
        <div className="text-base">{'Network'}</div>
      </div>
      <div className="flex gap-4">
        <DocumentIcon className="w-5 h-5" />
        <ArrowPathIcon className="w-5 h-5" />
        <ArchiveBoxXMarkIcon className="w-5 h-5" />
      </div>
    </div>
  );
};
export default function NetworkSide() {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <div className="flex items-center text-xl">
        <button
          className="w-12 h-12 flex items-center justify-center"
          onClick={() => {
            navigate(-1);
          }}>
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <div>{'Network Manage'}</div>
      </div>
      <div className="flex flex-col gap-2 mt-10">
        <NetworkItem />
        <NetworkItem />
        <NetworkItem />
      </div>
      <div>
        <Button
          className=" zm-bg-card rounded-3xl font-medium px-6 py-3 w-full mt-7"
          leftIcon={<PlusIcon className="h-4 w-4" />}
          onClick={() => {
            navigate('/setting/network/add');
          }}>
          Add Network
        </Button>
      </div>
    </div>
  );
}
