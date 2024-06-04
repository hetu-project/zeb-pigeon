import React, { useCallback } from 'react';
import { Cog6ToothIcon, SignalIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import BackendClient from '@root/src/shared/client/BackendClient';
export interface AccountCardProps {
  address?: string;
  name?: string;
  onSetting?: () => void;
}
export default function AccountCard({
  address,
  name,
  // onSetting,
}: AccountCardProps) {
  const navigate = useNavigate();
  const handleSetting = useCallback(() => {
    // onSetting?.()
    navigate('/side/account');
  }, [navigate]);
  return (
    <div className="flex mx-2 justify-between items-center zm-bg-card border border-[#F5F5F7] rounded-xl px-4 py-4 gap-4">
      <div className=" w-10 flex items-center justify-center h-10 rounded-full bg-[#6750A4] flex-shrink-0">
        {(address?.[0] || 'A').toUpperCase()}
      </div>
      <div className=" overflow-hidden">
        <div className="flex items-center justify-between">
          <div className=" font-medium text-base">{name}</div>
          <button
            className=" h-6 w-6 flex items-center justify-center btn-ghost"
            onClick={() => {
              BackendClient.switchAccount(address);
            }}>
            <label className="swap swap-flip text-9xl">
              {/* this hidden checkbox controls the state */}
              <input type="checkbox" />
              <div className="swap-on">
                <SignalIcon className="h-4 w-4" />
              </div>
              <div className="swap-off">
                <SignalIcon className="h-4 w-4" />
              </div>
            </label>
          </button>
        </div>
        <div className=" truncate zm-text-description text-sm">{address}</div>
      </div>
      <button
        className="w-10 h-10 rounded-full bg-[#6750A4] bg-opacity-15 flex-shrink-0 flex items-center justify-center"
        onClick={handleSetting}>
        <Cog6ToothIcon className="w-7 h-7 zm-text-title" />
      </button>
    </div>
  );
}
