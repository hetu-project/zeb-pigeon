import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

type KeyStore = string;

type KeyStoreStorage = BaseStorage<KeyStore> & {
  add: (key: string) => Promise<boolean>;
  remove: () => Promise<boolean>;
};

const storage = createStorage<KeyStore>('keystore', '', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

const keystoreStorage: KeyStoreStorage = {
  ...storage,
  add: async key => {
    await storage.set(key);
    return true;
  },
  remove: async () => {
    await storage.set('');
    return true;
  },
};

export default keystoreStorage;
