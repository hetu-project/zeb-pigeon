import React from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
export default function SearchInput() {
  const navigate = useNavigate();
  return (
    <div className="flex mx-2 justify-between items-center zm-bg-card border border-[#F5F5F7] rounded-xl">
      <div className="p-4">
        <MagnifyingGlassIcon strokeWidth={2.5} className="w-4 h-4 text-white font-bold" />
      </div>
      <div className="py-2 flex-grow overflow-hidden">
        <input
          placeholder="Please input to search"
          className="input input-xs w-full bg-transparent placeholder:zm-text-description"
        />
      </div>
      <Button
        className="p-4 cursor-pointer"
        onClick={() => {
          navigate('/contact/add');
        }}>
        <PlusIcon strokeWidth={2.5} className="w-4 h-4 text-white font-bold" />
      </Button>
    </div>
  );
}
