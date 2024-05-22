import { ChatMessage } from '@root/src/proto/ChatMessage';
import { ZChat, ZMessage } from '@root/src/proto/ZMsg';
import { messageStorageSortKey } from '@root/src/shared/account';
import WsProvider from '@root/src/shared/client/provider/WsProvider';
import keystoreStorage from '@root/src/shared/storages/keystoreStorage';
import messagesStorage from '@root/src/shared/storages/messageStorage';
import { hexToU8a, u8aToString } from '@root/src/shared/utils';
import ChatApi from '@src/shared/client/ChatApi';

export class BackendChat {
  isDisconnect: boolean;
  chatApi: ChatApi;
  endpoint: string;
  seedRpc: string;
  constructor() {
    this.chatApi = new ChatApi();
  }

  changeEndPoint(endpoint: string, seedRpc?: string) {
    if (this.chatApi?.provider) {
      this.chatApi.provider.disconnect();
    }
    this.endpoint = endpoint;
    const wsProvider = new WsProvider(endpoint);
    this.chatApi = new ChatApi({
      provider: wsProvider,
      seedRpc: seedRpc || this.seedRpc,
    });
    this.chatApi.accountSubscribeMessage(this.onMessage as never);
    this.chatApi.onError(this.onError);
    return this.chatApi.isReady;
  }

  sendMessage(from: string, to: string, message: string, fromNode: string, toNode: string, signature?: Uint8Array) {
    const data = {
      from,
      to,
      message,
      fromNode,
      toNode,
      signature,
    };
    console.log('BackendChat', this.chatApi, data);
    this.chatApi.accountSendMessage(from, to, message, fromNode, toNode, signature);
  }

  switchSeedRpc = async (rpc: string) => {
    this.seedRpc = rpc;
    this.chatApi.seedRpcServer = rpc;
    const address = await keystoreStorage.get();
    if (!address) return;
    // await keystoreStorage.set(address);
    const data = await this.chatApi.getEndpoint(address);
    const url = new URL(data.wsAddr);
    const wsUrl = `${data.wsAddr}/ws${url.port}`;
    await this.changeEndPoint(wsUrl);
    this.chatApi.provider.websocket.send(hexToU8a(address));
  };

  changeAccount = async (address: string) => {
    if (!address) return;
    await keystoreStorage.set(address);
    const data = await this.chatApi.getEndpoint(address);
    const url = new URL(data.wsAddr);
    const wsUrl = `${data.wsAddr}/ws${url.port}`;
    await this.changeEndPoint(wsUrl);
    this.chatApi.provider.websocket.send(hexToU8a(address));
  };

  async onMessage(message: ZMessage) {
    try {
      console.log('onMessage', message);
      const zChat = ZChat.decode(message.data);
      console.log('message zChat', zChat);
      const chatMessageBuffer = hexToU8a(zChat.messageData);
      const chatMessage = ChatMessage.decode(chatMessageBuffer);
      const from = u8aToString(chatMessage.from);
      const to = u8aToString(chatMessage.to);
      const key = messageStorageSortKey(from, to);

      const textMessage = u8aToString(chatMessage.data);
      const receiveMessage = {
        from,
        to: to,
        message: textMessage,
        sign: '',
      };
      await messagesStorage.addMessage(key, receiveMessage);
    } catch (error) {
      console.error('message decode error', error);
    }
  }

  async disconnect() {
    this.chatApi.provider.disconnect();
  }
  onError = async () => {
    console.log('backend error');
  };
  onClose = async () => {
    console.log('backend close');
  };
}
