import React from 'react';
import SearchInput from './SearchInput';
import DappCard from './DappCard';
import voteSvg from '@assets/img/Vote.svg';
import guitarSvg from '@assets/img/guitar.svg';
import metaMaskSvg from '@assets/img/MetaMask.svg';

export default function Dapps() {
  return (
    <div className="my-2">
      <div className="mt-2 mb-6">
        <SearchInput />
      </div>
      <div className="mt-10 px-2">
        <div className="flex justify-between items-center mb-7">
          <div className="font-medium text-base">{'Most popular dapps'}</div>
          <div className="text-xs text-[#2F80ED]">{'Show all'}</div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <DappCard icon={voteSvg} title={'Vote'} />
          <DappCard icon={guitarSvg} title={'Music'} />
          <DappCard icon={metaMaskSvg} title={'MetaMask'} />
        </div>
      </div>

      <div className="mt-12 px-2">
        <div className="flex justify-between items-center mb-7">
          <div className="font-medium text-base">{'Favorite dapps'}</div>
          <div className="text-xs text-[#2F80ED]"></div>
        </div>
        <div className="grid grid-cols-3 gap-5">
          <DappCard icon={voteSvg} title={'Vote'} />
          <DappCard icon={guitarSvg} title={'Music'} />
          <DappCard icon={metaMaskSvg} title={'MetaMask'} />

          <DappCard icon={voteSvg} title={'Vote'} />
          <DappCard icon={guitarSvg} title={'Music'} />
          <DappCard icon={metaMaskSvg} title={'MetaMask'} />
          <DappCard icon={voteSvg} title={'Vote'} />
          <DappCard icon={guitarSvg} title={'Music'} />
          <DappCard icon={metaMaskSvg} title={'MetaMask'} />
        </div>
      </div>
      <div></div>
    </div>
  );
}
