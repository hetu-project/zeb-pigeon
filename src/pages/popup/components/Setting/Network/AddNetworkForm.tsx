import React, { useCallback, useEffect } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate, useMatch } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import networkStorage from '@root/src/shared/storages/networkStorage';
import { useNetworkList } from '@root/src/shared/hooks/network';
import clsx from 'clsx';

type Inputs = {
  name: string;
  url: string;
  agent: string;
  rpc: string;
};
export default function AddNetworkForm() {
  const { register, getValues, setValue } = useForm<Inputs>();
  const navigate = useNavigate();
  const allNetwork = useNetworkList();
  const match = useMatch('/setting/network/edit/:name');
  const initParams = useCallback(() => {
    if (match?.params?.name) {
      const config = allNetwork.find(network => {
        return network.name === match.params.name;
      });
      if (!config) return;
      setValue('name', config.name || '');
      setValue('url', config.url || '');
      setValue('agent', config.agent || '');
      setValue('rpc', config.rpc || '');
    }
  }, [allNetwork, match?.params?.name, setValue]);
  useEffect(() => {
    initParams();
  }, [initParams]);
  const handleAddNetwork = useCallback(async () => {
    const name = getValues('name');
    const url = getValues('url') || '';
    const rpc = getValues('rpc') || '';
    const agent = getValues('agent') || '';
    if (!name) return;
    await networkStorage.add(name, {
      name,
      url,
      agent,
      rpc,
    });
    navigate(-1);
  }, [getValues, navigate]);
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
        <div>{match ? 'Edit Network' : 'Add Network'}</div>
      </div>
      <div className="flex flex-col gap-4 mt-10 px-2">
        <div className="">
          <div>{'Name:'}</div>
          <input
            disabled={!!match}
            className={clsx('w-full input-sm zm-bg-card border-none rounded-lg', {
              ' zm-text-description': !!match,
            })}
            {...register('name')}
          />
        </div>
        <div className="">
          <div>{'Rpc:'}</div>
          <input className="w-full input input-sm border zm-bg-card" {...register('rpc')} />
        </div>
        {/* <div className="">
          <div>{'Agent:'}</div>
          <input className="w-full input input-sm border zm-bg-card" {...register('agent')} />
        </div> */}
      </div>
      <div className="flex items-center justify-center gap-4 mt-7">
        <Button
          className=" zm-bg-card rounded-3xl font-medium px-6 py-3 w-28 opacity-50"
          onClick={() => {
            navigate(-1);
          }}>
          Cancel
        </Button>
        <Button className=" zm-bg-card rounded-3xl font-medium px-6 py-3 w-28" onClick={handleAddNetwork}>
          Save
        </Button>
      </div>
    </div>
  );
}
