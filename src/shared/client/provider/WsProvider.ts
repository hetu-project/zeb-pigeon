import { ProviderInterface, ProviderInterfaceCallback, ProviderInterfaceEmitCb, ProviderInterfaceEmitted } from '.';
import { JsonRpcRequest, JsonRpcResponse } from '../ChatApi';
import { EventEmitter } from 'eventemitter3';
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

export default class WsProvider implements ProviderInterface {
  private websocket: WebSocket | null;
  private endpoints: string;
  private id: number = 0;
  private handlers: Record<string, WsStateAwaiting> = {};
  private eventemitter: EventEmitter;
  constructor(endpoint: string | string[]) {
    this.eventemitter = new EventEmitter();
    const endpoints = Array.isArray(endpoint) ? endpoint : [endpoint];
    const defaultEndpoint = endpoints[0];
    this.endpoints = defaultEndpoint;
  }
  public async connect(): Promise<void> {
    this.websocket = new WebSocket(this.endpoints);
    if (this.websocket) {
      this.websocket.onmessage = this.onSocketMessage;
    }
  }
  disconnect(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private onSocketMessageResult = (response: JsonRpcResponse<string>): void => {
    // const buffer = response.result;
    // const decoded = framework.Zmessage.decode(buffer);

    this.eventemitter.emit('account_receiveMessage', response.result);

    const handler = this.handlers[response.id];

    if (!handler) {
      // l.debug(() => `Unable to find handler for id=${response.id}`);
      return;
    }

    try {
      // const { method, params, subscription } = handler;
      // const result = this.#coder.decodeResponse<string>(response);
      const result = response;

      // first send the result - in case of subs, we may have an update
      // immediately if we have some queued results already
      handler.callback(null, result);

      // if (subscription) {
      //   const subId = `${subscription.type}::${result}`;

      //   this.#subscriptions[subId] = objectSpread({}, subscription, {
      //     method,
      //     params
      //   });

      //   // if we have a result waiting for this subscription already
      //   if (this.#waitingForId[subId]) {
      //     this.#onSocketMessageSubscribe(this.#waitingForId[subId]);
      //   }
      // }
    } catch (error) {
      handler.callback(error as Error, undefined);
    }

    delete this.handlers[response.id];
  };

  onSocketMessageSubscribe = (response: JsonRpcResponse<unknown>): void => {
    if (!response.method) {
      throw new Error('No method found in JSONRPC response');
    }

    // const method = ALIASES[response.method] || response.method;
    // const subId = `${method}::${response.params.subscription}`;
    // const handler = this.#subscriptions[subId];

    // if (!handler) {
    //   // store the JSON, we could have out-of-order subid coming in
    //   this.#waitingForId[subId] = response;

    //   l.debug(() => `Unable to find handler for subscription=${subId}`);

    //   return;
    // }

    // housekeeping
    // delete this.#waitingForId[subId];

    // try {
    //   const result = this.#coder.decodeResponse(response);

    //   handler.callback(null, result);
    // } catch (error) {
    //   this.#endpointStats.errors++;
    //   this.#stats.total.errors++;

    //   handler.callback(error as Error, undefined);
    // }
  };

  private onSocketMessage = (message: MessageEvent<string>): void => {
    // l.debug(() => ['received', message.data]);

    // const bytesRecv = message.data.length;

    // this.#endpointStats.bytesRecv += bytesRecv;
    // this.#stats.total.bytesRecv += bytesRecv;

    const response = JSON.parse(message.data) as JsonRpcResponse<string>;
    console.log('onSocketMessage', message);

    return response.method === undefined ? this.onSocketMessageResult(response) : this.onSocketMessageResult(response);
  };
  on(type: ProviderInterfaceEmitted, sub: ProviderInterfaceEmitCb): () => void {
    this.eventemitter.on(type, sub);
    return (): void => {
      this.eventemitter.removeListener(type, sub);
    };
  }
  send<T = unknown>(
    method: string,
    params: unknown,
    isCacheable?: boolean,
    subscription?: SubscriptionHandler,
  ): Promise<T> {
    this.id++;
    const message: JsonRpcRequest = {
      id: this.id,
      jsonrpc: '2.0',
      method: method,
      params,
    };
    this.websocket.send(JSON.stringify(message));
    let a: T;
    if (isCacheable) Promise.resolve(a as T);
    if (subscription) Promise.resolve(a as T);
    return Promise.resolve(a as T);
  }
  subscribe(type: string, method: string, params: unknown, cb: ProviderInterfaceCallback): Promise<string | number> {
    return this.send<number | string>(method, params, false, { callback: cb, type });
  }
  unsubscribe(type: string, method: string, id: string | number): Promise<boolean> {
    if (type && id) {
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
  addEventListener(type: string, method: string, params: unknown, cb: ProviderInterfaceCallback) {
    this.eventemitter.addListener(method, cb);
    console.log('type', method, params, cb);
  }
}
