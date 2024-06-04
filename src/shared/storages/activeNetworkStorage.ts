import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

type ActiveNetwork = string;

type ActiveNetworkStorage = BaseStorage<ActiveNetwork> & {
  add: (key: string) => Promise<boolean>;
  remove: () => Promise<boolean>;
};

const storage = createStorage<ActiveNetwork>('activeNetwork', '', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

const activeNetworkStorage: ActiveNetworkStorage = {
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

export default activeNetworkStorage;
