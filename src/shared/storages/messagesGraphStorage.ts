import { BaseStorage, createStorage, StorageType } from '@src/shared/storages/base';

export interface Clock {
  value: Record<number, number>;
}
export interface VLCMessage {
  vlc: Clock;
  from: string;
  to: string;
  message: string;
  signature: string;
}
export interface ClockInfo {
  nodeID: number;
  eventCount: number;
  clock: Clock;
  messageId: string;
}
export interface MergeLog {
  fromID: number;
  toID: number;
}
export type Node = number;
export type Edge = [number, number];
export interface Graph {
  node: Node[];
  edge: Edge[];
}
type MessageGraphMap = Record<string, Graph>;

type MessageGraphMapStorage = BaseStorage<MessageGraphMap> & {
  addGraph: (address: string, value: Graph) => Promise<boolean>;
  removeGraph: (address: string) => Promise<boolean>;
};

const storage = createStorage<MessageGraphMap>(
  'messagesGraph',
  {},
  {
    storageType: StorageType.Local,
    liveUpdate: true,
  },
);

const messagesGraphStorage: MessageGraphMapStorage = {
  ...storage,
  addGraph: async (address, value) => {
    const graphMap = await storage.get();
    graphMap[address] = value;
    await storage.set(graphMap);
    return true;
  },
  removeGraph: async address => {
    const graphMap = await storage.get();
    delete graphMap[address];
    await storage.set(graphMap);
    return true;
  },
};

export default messagesGraphStorage;
