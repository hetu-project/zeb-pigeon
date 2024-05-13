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
}
