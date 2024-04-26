import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
export interface NetworkConfig {
  name: string;
  url: string;
  agent?: string;
}

type NetworkList = NetworkConfig[];

type NetworkListStorage = BaseStorage<NetworkList> & {
  add: (name: string, value: NetworkConfig) => Promise<boolean>;
  remove: (name: string) => Promise<boolean>;
};

const storage = createStorage<NetworkList>('networks', [], {
  storageType: StorageType.Local,
  liveUpdate: true,
});

const networkStorage: NetworkListStorage = {
  ...storage,
  add: async (name, value) => {
    const networksList = await storage.get();
    const newList = networksList.filter(item => {
      return item.name !== value.name;
    });
    newList.push(value);
    await storage.set(newList);
    return true;
  },
  remove: async name => {
    const networksList = await storage.get();
    const newList = networksList.filter(item => {
      return item.name !== name;
    });
    await storage.set(newList);
    return true;
  },
};

export default networkStorage;
