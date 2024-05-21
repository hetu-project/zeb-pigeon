import { ZMessage } from '@root/src/proto/zmessage';
import { ProviderInterfaceCallback, ProviderInterfaceEmitCb, ProviderInterfaceEmitted } from '.';
import { EventEmitter } from 'eventemitter3';
import { noop } from '@polkadot/util';
// import { framework } from '@root/src/proto/zmessage';

interface SubscriptionHandler {
  callback: ProviderInterfaceCallback;
  type: string;
}

interface WsStateAwaiting {
  callback: ProviderInterfaceCallback;
  method: string;
  params: unknown[];
  start: number;
  subscription?: SubscriptionHandler | undefined;
}

const RETRY_DELAY = 5_000;

export default class WsProvider {
  websocket: WebSocket | null;
  private endpoints: string;
  private id: number = 0;
  private handlers: Record<string, WsStateAwaiting> = {};
  private autoConnectMs = RETRY_DELAY;
  public readonly isReadyPromise: Promise<WsProvider>;
  eventemitter: EventEmitter;
  constructor(endpoint: string | string[]) {
    this.eventemitter = new EventEmitter();
    const endpoints = Array.isArray(endpoint) ? endpoint : [endpoint];
    const defaultEndpoint = endpoints[0];
    this.endpoints = defaultEndpoint;
    if (this.autoConnectMs && this.autoConnectMs > 0) {
      this.connectWithRetry().catch(noop);
    }
    this.isReadyPromise = new Promise((resolve): void => {
      this.eventemitter.once('connected', (): void => {
        resolve(this);
      });
    });
  }

  public async connectWithRetry(): Promise<void> {
    if (this.autoConnectMs > 0) {
      try {
        await this.connect();
      } catch {
        setTimeout((): void => {
          this.connectWithRetry().catch(noop);
        }, this.autoConnectMs);
      }
    }
  }
  public async connect(): Promise<void> {
    if (this.websocket) {
      throw new Error('WebSocket is already connected');
    }
    try {
      this.websocket = new WebSocket(this.endpoints);
      if (this.websocket) {
        this.websocket.onmessage = this.onSocketMessage;
        this.websocket.onerror = this.handleError;
        this.websocket.onclose = this.handleClose;
        this.websocket.onopen = this.handleSocketOpen;
      }
    } catch (error) {
      // l.error(error);

      this.eventemitter.emit('error', error);

      throw error;
    }
  }
  public async disconnect(): Promise<void> {
    this.autoConnectMs = 0;
    try {
      if (this.websocket) {
        // 1000 - Normal closure; the connection successfully completed
        this.websocket.close(1000);
        this.eventemitter.removeAllListeners();
      }
    } catch (error) {
      console.error(error);

      this.eventemitter.emit('error', error);

      throw error;
    }
  }

  private onSocketMessage = (message: MessageEvent<Blob>): void => {
    message.data.arrayBuffer().then(buffer => {
      // const decodedOrigin = ZChat.decode(new Uint8Array(buffer));
      // console.log('onSocketMessage', decodedOrigin);
      const decoded = ZMessage.create({
        data: new Uint8Array(buffer),
      });

      console.log('onSocketMessage', buffer);
      this.eventemitter.emit('account_receiveMessage', decoded);
    });

    // const response = JSON.parse(message.data) as JsonRpcResponse<string>;
    // console.log('onSocketMessage', message);

    // return response.method === undefined ? this.onSocketMessageResult(response) : this.onSocketMessageResult(response);
  };
  on(type: ProviderInterfaceEmitted, sub: ProviderInterfaceEmitCb): () => void {
    this.eventemitter.on(type, sub);
    return (): void => {
      this.eventemitter.removeListener(type, sub);
    };
  }
  addEventListener(method: string, cb: ProviderInterfaceCallback) {
    this.eventemitter.addListener(method, cb);
  }
  sendMessage(message: Uint8Array) {
    this.websocket.send(message);
  }
  handleError = () => {
    if (this.websocket) {
      this.websocket.onclose = null;
      this.websocket.onerror = null;
      this.websocket.onmessage = null;
      this.websocket.onopen = null;
      this.websocket = null;
    }
    if (this.autoConnectMs > 0) {
      setTimeout((): void => {
        this.connectWithRetry().catch(noop);
      }, this.autoConnectMs);
    }
    this.eventemitter.emit('error');
  };
  handleSocketOpen = () => {
    this.eventemitter.emit('connected');
  };
  handleClose = () => {
    if (this.websocket) {
      this.websocket.onclose = null;
      this.websocket.onerror = null;
      this.websocket.onmessage = null;
      this.websocket.onopen = null;
      this.websocket = null;
    }
    if (this.autoConnectMs > 0) {
      setTimeout((): void => {
        this.connectWithRetry().catch(noop);
      }, this.autoConnectMs);
    }
    this.eventemitter.emit('close');
    this.eventemitter.emit('disconnected');
  };
}
