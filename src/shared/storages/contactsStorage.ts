import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
export interface Contact {
  name: string;
  address: string;
}

export interface ContactFileJson {
  version: string;
  contacts: Contact[];
}

type ContactsMap = Record<string, Contact>;

type ContactsMapStorage = BaseStorage<ContactsMap> & {
  add: (address: string, value: Contact) => Promise<boolean>;
  remove: (address: string) => Promise<boolean>;
  exportContacts: (contacts?: string[]) => Promise<ContactFileJson>;
  importContacts: (json: ContactFileJson) => Promise<boolean>;
};

const storage = createStorage<ContactsMap>(
  'contacts',
  {},
  {
    storageType: StorageType.Local,
    liveUpdate: true,
  },
);

const contactsStorage: ContactsMapStorage = {
  ...storage,
  add: async (address, value) => {
    const contactsMap = await storage.get();
    contactsMap[address] = value;
    console.log('contactsStorage', contactsMap);
    await storage.set(contactsMap);
    return true;
  },
  remove: async address => {
    const contactsMap = await storage.get();
    delete contactsMap[address];
    await storage.set(contactsMap);
    return true;
  },
  importContacts: async (fileJson: ContactFileJson) => {
    const contactsMap = await storage.get();
    const contacts = fileJson.contacts;
    contacts.forEach(contact => {
      if (contact.address) {
        contactsMap[contact.address] = contact;
      }
    });
    await storage.set(contactsMap);
    return true;
  },
  exportContacts: async as => {
    const contactsMap = await storage.get();
    await storage.set(contactsMap);
    const allContacts = Object.values(contactsMap);
    let contacts: Contact[] = [];
    if (!as) {
      contacts = allContacts;
    } else {
      contacts = allContacts.filter(a => {
        return as.includes(a.address);
      });
    }
    return {
      version: '0.0.1',
      contacts: contacts,
    };
  },
};

export default contactsStorage;
