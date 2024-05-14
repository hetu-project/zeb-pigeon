import React, { useCallback } from 'react';
import {
  UserIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  ArchiveBoxXMarkIcon,
  PlusIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import networkStorage from '@root/src/shared/storages/networkStorage';
import { useActiveNetwork, useNetworkList } from '@root/src/shared/hooks/network';
import BackendClient from '@root/src/shared/client/BackendClient';

export interface NetworkItemProps {
  name?: string;
  url?: string;
  isActive?: boolean;
}

export const NetworkItem = ({ name, isActive }: NetworkItemProps) => {
  const navigate = useNavigate();

  const handleRemoveNetwork = useCallback(async () => {
    if (!name) return;
    await networkStorage.remove(name);
  }, [name]);

  const handleActiveNetwork = useCallback(async () => {
    if (!name) return;
    await BackendClient.activeNetwork(name);
    // await activeNetworkStorage.add(name);
    // if (!url) {
    //   await chrome.runtime.sendMessage(ChatCommandFactory.changeEndpoint(url));
    // }
  }, [name]);

  const handleEditNetwork = useCallback(async () => {
    if (!name) return;
    navigate(`/setting/network/edit/${name}`);
  }, [name, navigate]);

  return (
    <div className="flex items-center justify-between px-4 py-3 gap-4">
      <div>
        <UserIcon className="w-5 h-5" />
      </div>
      <div className="flex-grow">
        <div className="text-base">{name}</div>
      </div>
      <div className="flex gap-4">
        <CodeBracketIcon className="w-5 h-5 cursor-pointer" onClick={handleEditNetwork} />
        {isActive ? (
          <ArrowPathIcon className="w-5 h-5 zm-text-description cursor-not-allowed" />
        ) : (
          <ArrowPathIcon className="w-5 h-5 cursor-pointer" onClick={handleActiveNetwork} />
        )}
        <ArchiveBoxXMarkIcon className="w-5 h-5 cursor-pointer" onClick={handleRemoveNetwork} />
      </div>
    </div>
  );
};
export default function NetworkSide() {
  const navigate = useNavigate();
  const networkList = useNetworkList();
  const activeNetwork = useActiveNetwork();
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
        {networkList.map(network => {
          return (
            <NetworkItem
              key={network.name}
              name={network.name}
              url={network.url}
              isActive={activeNetwork?.name === network.name}
            />
          );
        })}
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
