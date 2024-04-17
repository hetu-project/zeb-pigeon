import { ProviderInterfaceCallback } from './provider';
import WsProvider from './provider/WsProvider';

export interface JsonRpcObject {
  id: number;
  jsonrpc: '2.0';
}

export interface JsonRpcRequest extends JsonRpcObject {
  method: string;
  params: unknown;
}

export interface JsonRpcResponseBaseError {
  code: number;
  data?: number | string;
  message: string;
}

export interface RpcErrorInterface<T> {
  code: number;
  data?: T;
  message: string;
  stack: string;
}

interface JsonRpcResponseSingle<T> {
  error?: JsonRpcResponseBaseError;
  result: T;
}

interface JsonRpcResponseSubscription<T> {
  method?: string;
  params: {
    error?: JsonRpcResponseBaseError;
    result: T;
    subscription: number | string;
  };
}

export type JsonRpcResponseBase<T> = JsonRpcResponseSingle<T> & JsonRpcResponseSubscription<T>;

export type JsonRpcResponse<T> = JsonRpcObject & JsonRpcResponseBase<T>;

export interface ChatApiOptions {
  provider?: WsProvider;
}
export default class ChatApi {
  private isReadyPromise: Promise<ChatApi>;
  provider: WsProvider;
  private mid = 0;
  constructor(options?: ChatApiOptions) {
    this.provider = options.provider;
    this.isReadyPromise = new Promise(resolve => {
      this.provider.connect().then(() => {
        resolve(this);
      });
    });
  }

  public static create(options?: ChatApiOptions): Promise<ChatApi> {
    const instance = new ChatApi(options);
    return instance.isReady;
  }
  public get isReady(): Promise<ChatApi> {
    return this.isReadyPromise;
  }

  public async bootstrapGetNode() {
    this.mid++;
    console.log('bootstrapGetNode', this.mid);
    this.provider.send<number>('bootstrap_getNode', {
      address: '',
      sign: '',
    });
  }
  public async nodeConnectNode(address: string) {
    this.provider.send<number>('node_connectNode', [
      {
        address: address,
        sign: '',
      },
    ]);
  }

  public async accountSendMessage(from: string, to: string, message: string) {
    this.provider.send<number>('account_sendMessage', {
      from,
      to,
      message,
      address: from,
      sign: '',
    });
    this.provider.send<number>('chain_getBlockHash', [0]);
  }

  public async accountPullMessage() {
    this.provider.send<number>('account_pullMessage', [
      {
        address: '',
        sign: '',
      },
    ]);
  }
  public async accountSubscribeMessage(cb: ProviderInterfaceCallback) {
    this.provider.addEventListener('', 'account_receiveMessage', {}, cb);
  }
}
