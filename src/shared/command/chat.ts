import { ChatCommand } from './types';

export class ChatCommandFactory {
  static changeEndpoint(endpoint: string) {
    return {
      type: ChatCommand.ChatChangeEndpoint,
      data: {
        endpoint,
      },
    };
  }

  static changeNetwork(rpc: string) {
    return {
      type: ChatCommand.ChatChangeNetwork,
      data: {
        rpc,
      },
    };
  }
  static sendMessage(
    from: string,
    to: string,
    message: string,
    fromNode: string,
    toNode: string,
    signature?: Uint8Array,
  ) {
    return {
      type: ChatCommand.ChatSendMessage,
      data: {
        from,
        to,
        message,
        fromNode,
        toNode,
        signature,
      },
    };
  }
  static changeAccount(address: string) {
    return {
      type: ChatCommand.ChatChangeAccount,
      data: {
        address,
      },
    };
  }
}
