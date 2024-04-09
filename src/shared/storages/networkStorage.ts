import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
interface Account {
  address: string;
}

type AccountsMap = Record<string, Account>;

type AccountsMapStorage = BaseStorage<AccountsMap> & {
  add: (address: string, value: Account) => Promise<boolean>;
  remove: (address: string) => Promise<boolean>;
};

const storage = createStorage<AccountsMap>(
  'networks',
  {},
  {
    storageType: StorageType.Local,
    liveUpdate: true,
  },
);

const keystoreStorage: AccountsMapStorage = {
  ...storage,
  add: async (address, account) => {
    const accountsMap = await storage.get();
    accountsMap[address] = account;
    await storage.set(accountsMap);

    // await storage.set((accountsMap) => {
    //   accountsMap[address] = account;
    //   return accountsMap;
    // });

    return true;
  },
  remove: async address => {
    const accountsMap = await storage.get();
    delete accountsMap[address];
    await storage.set(accountsMap);

    // await storage.set((accountsMap) => {
    //   delete accountsMap[address];
    //   return accountsMap;
    // });
    return true;
  },
};

export default keystoreStorage;
