// import { ChatMessage, ChatType } from '@root/src/proto/ChatMessage';
import { ProviderInterfaceCallback } from './provider';
import WsProvider from './provider/WsProvider';
import { ZMessage, ZType } from '@src/proto/zmessage';
import { stringToU8a, u8aToU8a } from '@src/shared/utils';
// import {blake2s} from '@noble/hashes/blake2s';

function isEqual(arr1: Uint8Array, arr2: Uint8Array): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((value, index) => value === arr2[index]);
}

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
    const data = new Uint8Array([
      10, 6, 1, 2, 3, 4, 5, 6, 42, 10, 104, 101, 108, 108, 111, 119, 111, 114, 108, 100, 58, 64, 51, 50, 48, 102, 98,
      54, 54, 56, 51, 57, 55, 102, 98, 102, 101, 55, 54, 55, 48, 52, 51, 54, 102, 50, 99, 97, 54, 48, 55, 54, 56, 98,
      48, 48, 52, 53, 56, 55, 100, 97, 56, 98, 54, 48, 50, 50, 99, 55, 51, 52, 99, 57, 51, 100, 52, 49, 57, 100, 101,
      54, 48, 54, 97, 49, 66, 64, 54, 51, 55, 49, 56, 99, 98, 102, 53, 98, 49, 51, 48, 51, 56, 52, 101, 98, 99, 52, 98,
      55, 99, 97, 97, 101, 51, 100, 102, 98, 57, 99, 100, 101, 97, 98, 49, 57, 101, 51, 52, 51, 53, 51, 52, 101, 97,
      101, 101, 98, 99, 55, 102, 98, 101, 51, 57, 55, 100, 99, 97, 101, 55, 97,
    ]);
    const originMessage = ZMessage.decode(data);
    console.log('accountSendMessage originMessage', originMessage);
    // const chatMessage = ChatMessage.create({
    //   id: blake2s(stringToU8a(message + new Date().getMilliseconds())),
    //   version: 0,
    //   type: ChatType.CHAT_TYPE_MESSAGE,
    //   publicKey: u8aToU8a(from),
    //   data: stringToU8a(message),
    //   signature: u8aToU8a(message),
    //   from: u8aToU8a(from),
    //   to: u8aToU8a(to),
    // });
    // console.log('accountSendMessage data chatMessage', chatMessage)
    // const chatBuffer = ChatMessage.encode(chatMessage).finish();

    // const hashId = blake2s(chatBuffer);
    // const idArray = hashId.subarray(0, 6);

    const idArray = new Uint8Array([1, 2, 3, 4, 5, 6]);

    const messageCreated = ZMessage.create({
      id: idArray,
      version: 0,
      type: ZType.Z_TYPE_RNG,
      // publicKey: u8aToU8a(from),
      data: stringToU8a(message),
      // signature: idArray,
      from: u8aToU8a(from),
      to: u8aToU8a(to),
    });

    const buffer = ZMessage.encode(messageCreated).finish();
    console.log('accountSendMessage data messageCreated', messageCreated);

    console.log('accountSendMessage data origin', data);
    console.log('accountSendMessage data now', buffer);

    console.log('accountSendMessage data isEqual', isEqual(data, buffer));

    return;
    // this.provider.sendMessage(buffer);
    // this.provider.sendMessage(data);
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
