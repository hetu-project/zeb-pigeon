export type ProviderInterfaceEmitted = 'connected' | 'disconnected' | 'error';
export type ProviderInterfaceEmitCb = (value?: unknown) => unknown;
export type ProviderInterfaceCallback = (error: Error | null, result: unknown) => void;
export interface ProviderInterface {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  on(type: ProviderInterfaceEmitted, sub: ProviderInterfaceEmitCb): () => void;
  send<T = unknown>(method: string, params: unknown, isCacheAble?: boolean): Promise<T>;
  subscribe(type: string, method: string, params: unknown, cb: ProviderInterfaceCallback): Promise<number | string>;
  unsubscribe(type: string, method: string, id: number | string): Promise<boolean>;
}
