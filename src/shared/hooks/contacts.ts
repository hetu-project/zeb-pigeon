import { useMemo } from 'react';
import contactsStorage from '../storages/contactsStorage';
import useStorage from './useStorage';

export const useAllContacts = () => {
  const contactsMap = useStorage(contactsStorage);
  return useMemo(() => {
    return Object.entries(contactsMap || {}).map(([, v]) => v);
  }, [contactsMap]);
};
export const useContactByAddress = (address: string) => {
  const contactsMap = useStorage(contactsStorage);
  return useMemo(() => {
    return contactsMap[address];
  }, [address, contactsMap]);
};
