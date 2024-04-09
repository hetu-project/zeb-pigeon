import React, { useCallback } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
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
        <div className=" font-medium text-base">{name}</div>
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
