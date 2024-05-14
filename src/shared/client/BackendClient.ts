import { ChatCommandFactory } from '@root/src/pages/background/command/chat';
import activeNetworkStorage from '../storages/activeNetworkStorage';
import networkStorage from '../storages/networkStorage';

export default class BackendClient {
  static async activeNetwork(name: string) {
    await activeNetworkStorage.add(name);
    const networks = await networkStorage.get();
    const network = networks.find(net => {
      return net.name === name;
    });
    if (!network) return;
    await chrome.runtime.sendMessage(ChatCommandFactory.changeEndpoint(network.url));
  }
}
