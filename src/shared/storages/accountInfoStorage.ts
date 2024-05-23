import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
export interface AccountInfo {
  address: string;
  points?: number;
  status?: string;
}

export interface AccountFileJson {
  version: string;
  accounts: AccountInfo[];
}

type AccountsInfoMap = Record<string, AccountInfo>;

type AccountsMapStorage = BaseStorage<AccountsInfoMap> & {
  updateAccountStatus: (address: string, status: string) => Promise<boolean>;
  updateAccountPoint: (address: string, points: number) => Promise<boolean>;
};

const storage = createStorage<AccountsInfoMap>(
  'accountsInfo',
  {},
  {
    storageType: StorageType.Local,
    liveUpdate: true,
  },
);

const accountInfoStorage: AccountsMapStorage = {
  ...storage,
  updateAccountStatus: async (address, status) => {
    const accountsMap = await storage.get();
    const info = accountsMap[address] || { address };
    info.status = status;
    accountsMap[address] = info;
    await storage.set(accountsMap);
    console.log('accountsMap', accountsMap);
    return true;
  },
  updateAccountPoint: async (address, points) => {
    const accountsMap = await storage.get();
    const info = accountsMap[address] || { address };
    info.points = points;
    accountsMap[address] = info;
    await storage.set(accountsMap);
    console.log('accountsMap', accountsMap);
    return true;
  },
};

export default accountInfoStorage;
