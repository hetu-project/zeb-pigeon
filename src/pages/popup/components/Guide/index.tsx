// import useStorage from '@root/src/shared/hooks/useStorage';
import keystoreStorage from '@root/src/shared/storages/keystoreStorage';
import accountStorage from '@root/src/shared/storages/accountStorage';

import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import bip39 from 'bip39';
import { Button } from '@chakra-ui/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

type Inputs = {
  seeds: string;
};

export default function Guide() {
  // const mainAccount = useStorage(keystoreStorage);
  // const accounts = useStorage(accountStorage);
  const navigate = useNavigate();
  const { control, register, getValues, setValue } = useForm<Inputs>();
  const handleImport = useCallback(() => {
    const seeds = getValues('seeds');
    const isValidate = bip39.validateMnemonic(seeds);
    if (!isValidate) {
      return;
    }
    keystoreStorage.add(seeds);
    accountStorage.add(seeds, { address: seeds });
    navigate('/home/account');
  }, [getValues, navigate]);

  const handleGenerate = useCallback(() => {
    const mnemonic = bip39.generateMnemonic();
    setValue('seeds', mnemonic);
  }, [setValue]);

  const seeds = useWatch({
    control,
    name: 'seeds',
    defaultValue: '',
  });

  const isValidateSeeds = useMemo(() => {
    return bip39.validateMnemonic(seeds);
  }, [seeds]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full flex px-4">
        <textarea
          rows={4}
          placeholder="Generate or import an account"
          className="textarea flex-grow resize-none zm-bg-card text-white mt-20 placeholder:zm-text-description"
          {...register('seeds')}></textarea>
      </div>
      <div className="flex justify-around gap-4">
        <Button
          className=" zm-bg-card rounded-3xl font-medium px-6 py-3 w-32"
          leftIcon={<PlusIcon className="h-4 w-4" />}
          onClick={handleGenerate}>
          Generate
        </Button>
        <Button
          className={clsx(' zm-bg-card rounded-3xl font-medium px-6 py-3 w-32', {
            'opacity-40': !isValidateSeeds,
          })}
          leftIcon={<PlusIcon className="h-4 w-4" />}
          onClick={handleImport}>
          Import
        </Button>
      </div>
      <div>Or</div>
      <div className="flex justify-around gap-4">
        <Button
          className=" zm-bg-card rounded-3xl font-medium px-6 py-3 w-[17rem]"
          leftIcon={<PlusIcon className="h-4 w-4" />}>
          Import from the file
        </Button>
      </div>
    </div>
  );
}
