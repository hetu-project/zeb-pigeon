import React, { useCallback } from 'react';
import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import contactsStorage from '@root/src/shared/storages/contactsStorage';

type Inputs = {
  name: string;
  address: string;
};
const NOOP = (): void => undefined;

function convertResult(result: ArrayBuffer): Uint8Array {
  const data = new Uint8Array(result);
  return data;
}

export default function AddContactForm() {
  const { register, getValues } = useForm<Inputs>();

  // const value = useWatch({
  //   control,
  //   name: ['name', 'address'],
  // });

  const navigate = useNavigate();

  const handleAdd = useCallback(async () => {
    const name = getValues('name');
    const address = getValues('address');
    await contactsStorage.add(address, {
      name,
      address,
    });
    navigate('/home/contact');
  }, [getValues, navigate]);

  const handleImportFromFile = useCallback(
    async (jsonString: string) => {
      const jsonFile = JSON.parse(jsonString);
      await contactsStorage.importContacts(jsonFile);
      navigate('/home/contracts');
    },
    [navigate],
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
          onClick={handleAdd}>
          Add Contract
        </Button>
      </div>
      <div className="flex items-center justify-center my-2">Or</div>
      <div className="flex items-center px-2">
        <Button
          {...getRootProps()}
          className=" zm-bg-card rounded-3xl font-medium px-6 py-3 flex-grow"
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
