import React, { useMemo, FC, useCallback } from 'react';
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
import useStorage from '@src/shared/hooks/useStorage';
import accountStorage from '@root/src/shared/storages/accountStorage';
import keystoreStorage from '@root/src/shared/storages/keystoreStorage';
interface AccountItemProps {
  address?: string;
  name?: string;
  onActive?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const AccountItem: FC<AccountItemProps> = ({ address, name, onActive, onEdit, onDelete }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 gap-4">
      <div>
        <UserIcon className="w-5 h-5" />
      </div>
      <div className="flex-grow overflow-hidden">
        <div>{name}</div>
        <div className="truncate">{address}</div>
      </div>
      <div className="flex gap-4">
        <DocumentIcon className="w-5 h-5 cursor-pointer" onClick={onEdit} />
        <ArrowPathIcon className="w-5 h-5 cursor-pointer" onClick={onActive} />
        <ArchiveBoxXMarkIcon className="w-5 h-5 cursor-pointer" onClick={onDelete} />
      </div>
    </div>
  );
};
export default function AccountSide() {
  const navigate = useNavigate();
  const accountsMap = useStorage(accountStorage);
  const keystoreSeeds = useStorage(keystoreStorage);
  const accounts = useMemo(() => {
    return Object.entries(accountsMap || {}).map(([, account]) => {
      return account;
    });
  }, [accountsMap]);
  const handleActive = useCallback(
    async (account: string) => {
      if (account) {
        await keystoreStorage.set(account);
        navigate(-1);
      }
    },
    [navigate],
  );
  const handleEdit = useCallback((account: string) => {
    console.log('edit', account);
  }, []);
  const handleDelete = useCallback(
    async (account: string) => {
      if (account && account === keystoreSeeds) {
        await keystoreStorage.remove();
      }
      await accountStorage.remove(account);
    },
    [keystoreSeeds],
  );

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
        <div>{'Account Manage'}</div>
      </div>
      <div className="flex flex-col gap-2 mt-10 max-h-96 overflow-scroll">
        {accounts.map(a => {
          return (
            <AccountItem
              key={a.address}
              address={a.address}
              name={`Account_${a.address.replace(' ', '').substring(0, 6)}`}
              onActive={() => handleActive(a.address)}
              onEdit={() => handleEdit(a.address)}
              onDelete={() => handleDelete(a.address)}
            />
          );
        })}
      </div>
      <div>
        <Button
          className=" zm-bg-card rounded-3xl font-medium px-6 py-3 w-full mt-7"
          leftIcon={<PlusIcon className="h-4 w-4" />}
          onClick={() => {
            navigate('/guide');
          }}>
          Add Account
        </Button>
      </div>
    </div>
  );
}
