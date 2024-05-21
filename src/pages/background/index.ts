import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';
import { startHeartbeat } from './heartBeat';
import { BackendChat } from './BackendChat';
import { ChatCommand } from '@root/src/shared/command/types';
import activeNetworkStorage from '@root/src/shared/storages/activeNetworkStorage';
import networkStorage, { NetworkConfig } from '@root/src/shared/storages/networkStorage';
import keystoreStorage from '@root/src/shared/storages/keystoreStorage';
reloadOnUpdate('pages/background');

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.scss');

console.log('background loaded');
const api: BackendChat | null = new BackendChat();
// let count = 0;

chrome.runtime.onMessage.addListener(request => {
  switch (request.type) {
    case ChatCommand.ChatChangeEndpoint:
      console.log(ChatCommand.ChatChangeEndpoint, request);
      api.changeEndPoint(request.data.endpoint);
      break;
    case ChatCommand.ChatSendMessage: {
      const { from, to, message, fromNode, toNode, signature } = request.data || {};
      api.sendMessage(from, to, message, fromNode, toNode, signature);
      break;
    }
    case ChatCommand.ChatChangeAccount: {
      const { address } = request.data || {};
      api.changeAccount(address);
      break;
    }
    default:
      break;
  }
  console.log('request', request);
  console.log('api', api);
});

// const interval = async () => {
//   await chrome.runtime.getPlatformInfo();
//   count ++;
//   console.log('interval count', count)
// }

// async function waitUntil(promise: Promise<unknown>) {
//   const keepAlive = setInterval(interval, 20 * 1000);
//   try {
//     await promise;
//   } finally {
//     // clearInterval(keepAlive);
//     console.log('keepAlive', keepAlive)
//   }
// }

// waitUntil(Promise.resolve(1));
// console.log('waitUntil')
startHeartbeat();

async function init() {
  const network = await activeNetworkStorage.get();

  const allNetworks = await networkStorage.get();

  const activeNetwork: NetworkConfig | undefined = allNetworks?.find(item => {
    return item.name === network;
  });
  api.seedRpc = 'http://127.0.0.1:12345/rpc12345';
  console.log(activeNetwork);

  // api.changeEndPoint(activeNetwork?.url);
  const account = await keystoreStorage.get();
  if (account) {
    await api.changeAccount(account);
  }
}
init();
