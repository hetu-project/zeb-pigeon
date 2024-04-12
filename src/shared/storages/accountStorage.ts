import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
interface Account {
  name: string;
  address: string;
  mnemonic?: string;
  privateKey?: string;
  publicKey?: string;
}

interface AccountFileJson {
  version: string;
  accounts: Account[];
}

type AccountsMap = Record<string, Account>;

type AccountsMapStorage = BaseStorage<AccountsMap> & {
  add: (address: string, value: Account) => Promise<boolean>;
  remove: (address: string) => Promise<boolean>;
  exportAccounts: (account?: string[]) => Promise<AccountFileJson>;
  importAccounts: (json: AccountFileJson) => Promise<boolean>;
};

const storage = createStorage<AccountsMap>(
  'accounts',
  {},
  {
    storageType: StorageType.Local,
    liveUpdate: true,
  },
);

const accountStorage: AccountsMapStorage = {
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
  importAccounts: async (fileJson: AccountFileJson) => {
    const accountsMap = await storage.get();
    const accounts = fileJson.accounts;
    accounts.forEach(account => {
      if (account.address) {
        accountsMap[account.address] = account;
      }
    });
    await storage.set(accountsMap);
    return true;
  },
  exportAccounts: async as => {
    const accountsMap = await storage.get();
    await storage.set(accountsMap);
    const allAccounts = Object.values(accountsMap);
    let accounts: Account[] = [];
    if (!as) {
      accounts = allAccounts;
    } else {
      accounts = allAccounts.filter(a => {
        return as.includes(a.address);
      });
    }
    return {
      version: '0.0.1',
      accounts: accounts,
    };
  },
};

export default accountStorage;
