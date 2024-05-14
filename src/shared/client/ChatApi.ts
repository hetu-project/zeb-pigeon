import { ChatMessage, ChatType } from '@root/src/proto/ChatMessage';
import { ProviderInterfaceCallback } from './provider';
import WsProvider from './provider/WsProvider';
// import { ZMessage, ZType } from '@src/proto/zmessage';
import { Action, Clock, ClockInfo, Identity, Innermsg, ZChat, ZMessage, ZType } from '@src/proto/ZMsg';

import { hexToU8a, stringToU8a, u8aToHex, u8aToU8a } from '@src/shared/utils';
import { blake2s } from '@noble/hashes/blake2s';

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

  public async accountSendMessage(
    from: string,
    to: string,
    message: string,
    fromNode: string,
    node: string,
    signature?: Uint8Array,
  ) {
    const chatMessage = ChatMessage.create({
      // id: blake2s(stringToU8a(message + new Date().getMilliseconds())),
      version: 0,
      type: ChatType.CHAT_TYPE_MESSAGE,
      // publicKey: u8aToU8a(from),
      data: stringToU8a(message),
      signature: signature,
      from: u8aToU8a(from),
      to: u8aToU8a(to),
    });
    const chatBuffer = ChatMessage.encode(chatMessage).finish();
    const hashId = blake2s(chatBuffer);
    const clockId = blake2s(hashId);
    const clockValues = {
      [u8aToHex(clockId, -1, false)]: '1',
    };
    const clock = Clock.create({
      values: clockValues,
    });
    const clockInfo = ClockInfo.create({
      id: clockId,
      messageId: hashId,
      clock,
      count: '1',
      createAt: new Date().getMilliseconds().toString(),
    });
    const chat = ZChat.create({
      messageData: u8aToHex(chatBuffer), // (message),
      clock: clockInfo,
    });
    console.log('self zchat', chat);
    const data = ZChat.encode(chat).finish();
    const messageCreated = ZMessage.create({
      // id: hashId,
      // version: 0,
      // action: ZAction.Z_TYPE_WRITE,
      type: ZType.Z_TYPE_ZCHAT,
      // identity: ZIdentity.U_TYPE_CLI,
      // publicKey: u8aToU8a(from),
      data: data,
      // signature: signature,
      // from: hexToU8a(fromNode),
      to: hexToU8a(node),
    });

    const innerMessage = Innermsg.create({
      message: messageCreated,
      identity: Identity.IDENTITY_CLIENT,
      action: Action.ACTION_WRITE,
    });

    const buffer = Innermsg.encode(innerMessage).finish();
    this.provider.sendMessage(buffer);
    // console.log('messageCreated', messageCreated);
    // const originData = ZMessage.decode(originBuffer);
    // const originDataBuffer = ZMessage.encode(originData).finish();
    // console.log('messageCreated', originData);
    // this.provider.sendMessage(originDataBuffer);
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
  public async onError(cb: () => void) {
    this.provider.eventemitter.addListener('error', cb);
  }
  public async onClose(cb: () => void) {
    this.provider.eventemitter.addListener('close', cb);
  }
}
