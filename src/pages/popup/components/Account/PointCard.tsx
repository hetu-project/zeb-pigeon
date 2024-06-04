import React, { useCallback } from 'react';
import { CheckCircleIcon, GiftIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useAccountInfoByAddress } from '@root/src/shared/hooks/accounts';
import { Button, Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@chakra-ui/react';
import accountInfoStorage from '@root/src/shared/storages/accountInfoStorage';
export interface PointCardProps {
  address?: string;
  name?: string;
  onSetting?: () => void;
}
export default function PointCard({
  address,
  // onSetting,
}: PointCardProps) {
  const accountInfo = useAccountInfoByAddress(address);
  const handleActive = useCallback(async () => {
    await accountInfoStorage.updateAccountPoint(address, (accountInfo?.points || 0) + 1);
    console.log(address);
  }, [accountInfo?.points, address]);

  const handleSwitchStatus = useCallback(
    async (status: string) => {
      await accountInfoStorage.updateAccountStatus(address, status);
    },
    [address],
  );
  return (
    <div className="flex mx-2 justify-between items-center zm-bg-card rounded-xl px-4 py-4 gap-4">
      <div className="flex items-center">
        <button
          className="w-5 h-5 rounded-full bg-[#6750A4] bg-opacity-15 flex-shrink-0 flex items-center justify-center"
          onClick={handleActive}>
          <GiftIcon className="w-4 h-4 zm-text-title" />
        </button>
        <div className="ml-2">{accountInfo?.points ?? '0'}</div>
      </div>
      <div>
        <Popover>
          <PopoverTrigger>
            <div className="flex items-center cursor-pointer">
              <button className="w-5 h-5 rounded-full bg-[#6750A4] bg-opacity-15 flex-shrink-0 flex items-center justify-center">
                {accountInfo?.status === 'online' ? (
                  <CheckCircleIcon className="w-4 h-4 zm-text-title text-green-500" />
                ) : (
                  <XCircleIcon className="w-4 h-4 zm-text-title text-red-500" />
                )}
              </button>
              <div>{accountInfo?.status || 'offline'}</div>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <div className="flex flex-col gap-2">
                <Button
                  as={'div'}
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSwitchStatus('online')}>
                  <div className="w-5 h-5 rounded-full bg-[#6750A4] bg-opacity-15 flex-shrink-0 flex items-center justify-center">
                    <CheckCircleIcon className="w-4 h-4 zm-text-title text-green-500" />
                  </div>
                  <div>{'online'}</div>
                </Button>
                <Button
                  as={'div'}
                  className="flex items-center cursor-pointer"
                  onClick={() => handleSwitchStatus('offline')}>
                  <div className="w-5 h-5 rounded-full bg-[#6750A4] bg-opacity-15 flex-shrink-0 flex items-center justify-center">
                    <XCircleIcon className="w-4 h-4 zm-text-title text-red-500" />
                  </div>
                  <div>{'offline'}</div>
                </Button>
              </div>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
