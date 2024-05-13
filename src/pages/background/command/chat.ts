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
}
