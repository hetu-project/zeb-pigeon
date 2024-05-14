import { ChatMessage } from '@root/src/proto/ChatMessage';
import { ZChat, ZMessage } from '@root/src/proto/ZMsg';
import { messageStorageSortKey } from '@root/src/shared/account';
import WsProvider from '@root/src/shared/client/provider/WsProvider';
import messagesStorage from '@root/src/shared/storages/messageStorage';
import { hexToU8a, u8aToString } from '@root/src/shared/utils';
import ChatApi from '@src/shared/client/ChatApi';
export class BackendChat {
  isDisconnect: boolean;
  chatApi: ChatApi;
  endpoint: string;
  constructor() {}

  changeEndPoint(endpoint: string) {
    if (this.chatApi) {
      this.disconnect();
    }
    this.endpoint = endpoint;
    const wsProvider = new WsProvider(endpoint);
    this.chatApi = new ChatApi({
      provider: wsProvider,
    });
    this.chatApi.accountSubscribeMessage(this.onMessage as never);
    this.chatApi.onError(this.onError);
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
    // this.isDisconnect = true;
    this.chatApi.provider.websocket.close();
    this.chatApi.provider.eventemitter.removeAllListeners();
  }
  onError = async () => {
    console.log('backend error');
    setTimeout(() => {
      this.reConnect();
      // if(!this.isDisconnect) {
      //   this.reConnect();
      // }
    }, 20 * 1000);
  };
  onClose = async () => {
    console.log('backend close');
  };
  reConnect = async () => {
    console.log('backend reConnect');
    this.changeEndPoint(this.endpoint);
  };
}
