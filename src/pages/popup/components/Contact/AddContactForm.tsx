import React from 'react';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { useForm, useWatch } from 'react-hook-form';

type Inputs = {
  name: string;
  address: string;
};
export default function AddContactForm() {
  const { control, register } = useForm<Inputs>();

  const value = useWatch({
    control,
    name: ['name', 'address'],
  });

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
        <div>{'Add Contact'}</div>
      </div>
      <div className="flex flex-col gap-4 mt-10 px-2">
        <div className="">
          <div>{'Name:'}</div>
          <input className="w-full input input-sm border zm-bg-card" {...register('name')} />
        </div>
        <div className="">
          <div>{'Address:'}</div>
          <input className="w-full input input-sm border zm-bg-card" {...register('address')} />
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 mt-7 px-2">
        <Button
          className=" zm-bg-card rounded-3xl font-medium px-6 py-3 w-full"
          leftIcon={<PlusIcon className="h-4 w-4" />}
          onClick={() => {
            console.log(value);
            navigate(-1);
          }}>
          Add Contract
        </Button>
      </div>
    </div>
  );
}
