import { IAppSettings } from './App';
import { postMessageData, postMessageResponse, worker } from './WebWorker';

export interface IAnalytics {
  insert(
    word: string, correctWord: string, timeNeeded: number, appSettings: IAppSettings, textId: number
  ): void;
  analyzePrevious(appSettings: IAppSettings): void;
  analyzeAll(appSettings: IAppSettings): void;
}

export interface IAnalyticsData {
  textId?: number;
  word: string;
  correctWord: string;
  timeNeeded: number;
  datetime: string;
}

export class Analytics implements IAnalytics {
  protected data: IAnalyticsData[];
  protected prevChunkEnd: number;
  protected prevChunkStart: number;
  protected currentTextId: number;
  constructor() {
    this.data = [];
    this.prevChunkStart = 0;
    this.prevChunkEnd = 0;
  }

  public insert(
    word: string, correctWord: string, timeNeeded: number, appSettings: IAppSettings, textId: number
  ): void {
    this.currentTextId = textId;
    word = word.replace(' ', '');
    const datetime = new Date().toISOString();
    const data = {word, correctWord, timeNeeded, textId, datetime};
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
