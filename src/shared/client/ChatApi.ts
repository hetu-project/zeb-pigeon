import { ChatMessage, ChatType } from '@root/src/proto/ChatMessage';
import WsProvider from './provider/WsProvider';
import { Clock, ClockInfo, OutboundMsg, ZChat, ZMessage, ZType } from '@src/proto/ZMsg';

import { hexToU8a, stringToU8a, u8aToHex, u8aToU8a } from '@src/shared/utils';
import { blake2s } from '@noble/hashes/blake2s';
// import axios from 'axios';
export interface ChatApiOptions {
  provider?: WsProvider;
  seedRpc: string;
}
export default class ChatApi {
  provider: WsProvider;
  seedRpcServer = 'http://127.0.0.1:12345/rpc12345';
  account: string;
  constructor(options?: ChatApiOptions) {
    if (options?.provider) {
      this.provider = options?.provider;
    }
    if (options?.seedRpc) {
      this.seedRpcServer = options?.seedRpc;
    }
  }

  public static create(options?: ChatApiOptions): Promise<ChatApi> {
    const instance = new ChatApi(options);
    return instance.isReady;
  }
  public get isReady(): Promise<ChatApi> {
    return new Promise((resolve, reject) => {
      this.provider.isReadyPromise
        .then(() => {
          resolve(this);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  public async connect(address: string) {
    this.account = address;
    this.provider.websocket.send(address);
  }

  public getEndpoint = async (address: string) => {
    const body = {
      method: 'getWsAddr',
      address,
    };
    console.log('this.seedRpcServer', this.seedRpcServer);
    console.log('this.seedRpcServer', body);

    // const res = await axios.post(this.seedRpcServer, body);
    const res = await fetch(this.seedRpcServer, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
  };

  public async accountSendMessage(
    from: string,
    to: string,
    message: string,
    fromNode: string,
    node: string,
    signature?: Uint8Array,
  ) {
    return await this.sendMessage(from, to, message, signature);
  }

  public async sendMessage(from: string, to: string, message: string, signature?: Uint8Array) {
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
      nodeId: clockId,
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
      from: hexToU8a(from),
      to: hexToU8a(to),
    });

    console.log('self messageCreated', messageCreated);

    // const innerMessage = Innermsg.create({
    //   message: messageCreated,
    //   identity: Identity.IDENTITY_CLIENT,
    //   action: Action.ACTION_WRITE,
    // });
    // console.log('innerMessage', innerMessage);
    const outboundMsg = OutboundMsg.create({
      id: hashId,
      from: hexToU8a(from),
      to: hexToU8a(to),
      data: chatBuffer,
    });

    // const buffer = Innermsg.encode(innerMessage).finish();
    // const buffer = ZMessage.encode(messageCreated).finish();
    const buffer = OutboundMsg.encode(outboundMsg).finish();

    this.provider.sendMessage(buffer);

    // const originBuffer = new Uint8Array(
    //   '42 13 72 101 108 108 111 44 32 119 111 114 108 100 33 58 32 163 32 16 47 89 196 210 55 102 242 29 38 162 166 117 34 155 52 97 67 13 142 197 117 241 100 196 203 148 207 12 242 66 32 239 197 79 14 219 189 35 37 13 172 203 41 29 157 111 27 166 69 75 119 66 48 155 119 27 111 59 207 33 157 114 108'
    //     .split(' ')
    //     .map(item => Number(item)),
    // );
    // console.log('messageCreated', messageCreated);
    // const originData = ZMessage.decode(originBuffer);
    // // const originDataBuffer = ZMessage.encode(originData).finish();
    // console.log('messageCreated originData', originData);
    // this.provider.sendMessage(originDataBuffer);
  }
  public async accountSubscribeMessage(cb: (message: unknown) => void) {
    this.provider.addEventListener('account_receiveMessage', cb);
  }
  public async subscribeMessage(cb: (message: unknown) => void) {
    this.accountSubscribeMessage(cb);
  }
  public async onError(cb: () => void) {
    this.provider.eventemitter.addListener('error', cb);
  }
  public async onClose(cb: () => void) {
    this.provider.eventemitter.addListener('close', cb);
  }
}
