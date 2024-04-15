import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';
export interface SessionItem {
  from?: string;
  to: string;
  latestAt?: string;
}
type Account = string;
type SessionRecord = Record<Account, SessionItem>;

type SessionMap = Record<Account, SessionRecord>;

type SessionMapStorage = BaseStorage<SessionMap> & {
  updateSession: (address: string, value: SessionItem) => Promise<boolean>;
  removeSession: (address: string, value: SessionItem) => Promise<boolean>;
};

const storage = createStorage<SessionMap>(
  'messagesSession',
  {},
  {
    storageType: StorageType.Local,
    liveUpdate: true,
  },
);

const messagesSessionStorage: SessionMapStorage = {
  ...storage,
  updateSession: async (address, value) => {
    const sessionMap = await storage.get();
    sessionMap[address] = sessionMap[address] || {};
    sessionMap[address][value.to] = {
      ...value,
    };
    await storage.set(sessionMap);
    return true;
  },
  removeSession: async (address, value) => {
    const sessionMap = await storage.get();
    sessionMap[address] = sessionMap[address] || {};
    delete sessionMap[address][value.to];
    await storage.set(sessionMap);
    return true;
  },
};

export default messagesSessionStorage;
