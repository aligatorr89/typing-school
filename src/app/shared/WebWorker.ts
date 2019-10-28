import { IAnalyticsData } from './Analytics';
import { IAppSettings } from '../app';
import { TypingSchoolTables } from './IndexedDb';

export const workerLocation = '/public/js/worker.js';

export type EventDataNames = TypingSchoolTables | 'getLast100Rows' | 'changeSettings' | 'test';
export type EventDataTypes = IAnalyticsData | IAnalyticsData[];

export interface IAppWorker extends Worker {
  onmessage: ((this: IAppWorker, ev: IPostMessage) => any) | null;
  postMessage(message: IPostMessageData): void;
}

export interface IPostMessageData {
  id: number;
  name: EventDataNames;
  data: any;
  appSettings: IAppSettings;
}

export interface IPostMessage extends MessageEvent {
  data: IPostMessageData;
}

export class PostMessageCounter {
  private static counter: number = 0;

  public static get count() {
    return ++PostMessageCounter.counter;
  }

  public static get value() {
    return PostMessageCounter.counter;
  }
}

export const postMessageData = (name: EventDataNames, data, appSettings): IPostMessageData => {
  return {id: PostMessageCounter.count, name, data, appSettings};
};

export const postMessageResponse = (): Promise<IPostMessageData> => {
  const id = PostMessageCounter.value;
  return new Promise((resolve, reject) => {
    worker.addEventListener('message', function response(event) {
      if (event.data.id === id) {
        resolve(event.data);
        worker.removeEventListener('message', response);
      }
    });
    worker.onerror = (error) => {
      reject(error);
    };
  });
};

export const worker: IAppWorker = new Worker(workerLocation);
