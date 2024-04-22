// import useStorage from '@root/src/shared/hooks/useStorage';
import keystoreStorage from '@root/src/shared/storages/keystoreStorage';
import accountStorage from '@root/src/shared/storages/accountStorage';

import React, { useCallback, useMemo } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import { useForm, useWatch } from 'react-hook-form';
import bip39 from 'bip39';
import { Button } from '@chakra-ui/react';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Mnemonic } from '@src/shared/crypto/mnemonic';
import { etc } from '@noble/ed25519';
import { useDropzone } from 'react-dropzone';
import useStorage from '@root/src/shared/hooks/useStorage';

type Inputs = {
  name: string;
  seeds: string;
};
// interface FileState {
//   name: string;
//   size: number;
// }

const NOOP = (): void => undefined;

function convertResult(result: ArrayBuffer): Uint8Array {
  const data = new Uint8Array(result);
  return data;
}

export default function Guide() {
  const mainAccount = useStorage(keystoreStorage);
  // const accounts = useStorage(accountStorage);
  const navigate = useNavigate();
  const { control, register, getValues, setValue } = useForm<Inputs>();
  // const [file, setFile] = useState<FileState | undefined>();
  const handleImport = useCallback(() => {
    const mnemonic = getValues('seeds');
    const accountName = getValues('name');
    const isValidate = bip39.validateMnemonic(mnemonic);
    if (!isValidate) {
      return;
    }
    const hdKey = Mnemonic.generateHdKeyFromMnemonic(mnemonic);
    // const hdKey = Mnemonic.generateEd25519FromMnemonic(mnemonic);
    const address = etc.bytesToHex(hdKey.publicKey);
    keystoreStorage.add(address);
    accountStorage.add(address, {
      name: accountName || `Account_${address.substring(0, 6)}`,
      address: address,
      mnemonic,
      publicKey: etc.bytesToHex(hdKey.publicKey),
      privateKey: etc.bytesToHex(hdKey.privateKey),
    });
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

  const handleImportFromFile = useCallback(
    async (jsonString: string) => {
      const jsonFile = JSON.parse(jsonString);
      await accountStorage.importAccounts(jsonFile);
      const accounts = jsonFile.accounts || [];
      if (!mainAccount) {
        await keystoreStorage.set(accounts[0]?.address);
      }
      console.log(accountStorage);
      navigate('/home/account');
    },
    [mainAccount, navigate],
  );

  const onDrop = useCallback(
    (files: File[]): void => {
      files.forEach((file): void => {
        const reader = new FileReader();

        reader.onabort = NOOP;
        reader.onerror = NOOP;

        reader.onload = ({ target }: ProgressEvent<FileReader>): void => {
          if (target?.result) {
            // const name = file.name;
            const data = convertResult(target.result as ArrayBuffer);
            const decoder = new TextDecoder('utf-8');
            const jsonString = decoder.decode(data);
            handleImportFromFile(jsonString);
            // setFile({
            //   name,
            //   size: data.length
            // });
          }
        };

        reader.readAsArrayBuffer(file);
      });
    },
    [handleImportFromFile],
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const match = useMatch('/setting/account/add');
  const showBack = useMemo(() => {
    return !!match;
  }, [match]);

  return (
    <div className="flex flex-col items-center gap-4 relative">
      {showBack ? (
        <div className="flex items-center text-xl w-full absolute">
          <button
            className="w-12 h-12 flex items-center justify-center"
            onClick={() => {
              navigate(-1);
            }}>
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className="w-full flex px-4">
        <input
          placeholder="Account name"
          className="input flex-grow resize-none zm-bg-card text-white mt-20 placeholder:zm-text-description"
          {...register('name')}></input>
      </div>
      <div className="w-full flex px-4">
        <textarea
          rows={4}
          placeholder="Generate or import an account"
          className="textarea flex-grow resize-none zm-bg-card text-white placeholder:zm-text-description"
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
          {...getRootProps()}
          className=" zm-bg-card rounded-3xl font-medium px-6 py-3 w-[17rem]"
          leftIcon={<PlusIcon className="h-4 w-4" />}>
          <input
            {...getInputProps()}
            accept="application/json, text/plain"
            tabIndex={-1}
            className="hidden"
            type="file"
          />
          Import from the file
        </Button>
      </div>
    </div>
  );
}
