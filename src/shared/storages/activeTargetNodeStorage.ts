import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

type ActiveTargetNode = string;

type ActiveTargetNodeStorage = BaseStorage<ActiveTargetNode> & {
  add: (key: string) => Promise<boolean>;
  remove: () => Promise<boolean>;
};

const storage = createStorage<ActiveTargetNode>('activeTargetNode', '', {
  storageType: StorageType.Local,
  liveUpdate: true,
});

const activeTargetNodeStorage: ActiveTargetNodeStorage = {
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

export default activeTargetNodeStorage;
