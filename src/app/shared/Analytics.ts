import { IAppSettings } from './App';
import { postMessageData, postMessageResponse, worker } from './WebWorker';

export interface IAnalytics {
  insert(word: string, correctWord: string, timeNeeded: number, appSettings: IAppSettings): void;
  analyzePrevious(appSettings: IAppSettings): void;
  analyzeAll(appSettings: IAppSettings): void;
}

export interface IAnalyticsData {
  textId?: number;
  word: string;
  correctWord: string;
  timeNeeded: number;
}

export class Analytics implements IAnalytics {
  protected data: IAnalyticsData[];
  protected prevChunkEnd: number;
  protected prevChunkStart: number;
  constructor() {
    this.data = [];
    this.prevChunkStart = 0;
    this.prevChunkEnd = 0;
  }

  public insert(word: string, correctWord: string, timeNeeded: number, appSettings: IAppSettings): void {
    word = word.replace(' ', '');
    const data = {word, correctWord, timeNeeded};
    this.data.push(data);
    worker.postMessage(postMessageData('words', data, appSettings));
    postMessageResponse();
  }

  public analyzePrevious(appSettings: IAppSettings) {
    this.prevChunkEnd = this.data.length;
    const previous = this.data.slice(this.prevChunkStart, this.prevChunkEnd);
    this.prevChunkStart = this.prevChunkEnd;
    return this.analyze(previous, appSettings);
  }

  public analyzeAll(appSettings: IAppSettings) {
    return this.analyze(this.data, appSettings);
  }

  private analyze(dataChunk: IAnalyticsData[], appSettings: IAppSettings) {
    worker.postMessage(postMessageData('analytics', dataChunk, appSettings));
    return postMessageResponse()
    .then((res) => res.data);
  }
}
