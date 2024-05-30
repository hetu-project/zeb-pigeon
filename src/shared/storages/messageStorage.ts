import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
export interface MessageItem {
  id: string;
  from: string;
  to: string;
  message: string;
  sign: string;
}

type ContactsMap = Record<string, MessageItem[]>;

type ContactsMapStorage = BaseStorage<ContactsMap> & {
  addMessage: (address: string, value: MessageItem) => Promise<boolean>;
  clearMessage: (address: string) => Promise<boolean>;
};

const storage = createStorage<ContactsMap>(
  'messages',
  {},
  {
    storageType: StorageType.Local,
    liveUpdate: true,
  },
);

const messagesStorage: ContactsMapStorage = {
  ...storage,
  addMessage: async (address, value) => {
    const contactsMap = await storage.get();
    // console.log('addMessage', address, value);
    contactsMap[address] = contactsMap[address] || [];
    contactsMap[address].push(value);
    await storage.set(contactsMap);
    return true;
  },
  clearMessage: async address => {
    const contactsMap = await storage.get();
    delete contactsMap[address];
    await storage.set(contactsMap);
    return true;
  },
};

export default messagesStorage;
