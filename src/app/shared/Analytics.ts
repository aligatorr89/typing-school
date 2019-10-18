import { IAppSettings } from '../app';
import { AnalyticsResult } from './AnalyticsResult';

export interface IAnalytics {
  data: IAnalyticsData[];
  prevChunkStart: number;
  prevChunkEnd: number;
  insert(word: string, correctWord: string, timeNeeded: number): void;
}

export interface IAnalyticsData {
  textId?: number;
  word: string;
  correctWord: string;
  timeNeeded: number;
}

export class Analytics implements IAnalytics {
  public data: IAnalyticsData[];
  public prevChunkEnd: number;
  public prevChunkStart: number;

  constructor() {
    this.data = [];
    this.prevChunkStart = 0;
    this.prevChunkEnd = 0;
    // this.dbConnection = new indexedDb();
  }

  public insert(word: string, correctWord: string, timeNeeded: number): void {
    word = word.replace(' ', '');
    this.data.push({
      word, correctWord, timeNeeded
    });
  }

  public analyzePrevious(appSettings: IAppSettings) {
    this.prevChunkEnd = this.data.length;
    const previous = this.data.slice(this.prevChunkStart, this.prevChunkEnd);
    return this.analyze(previous, appSettings);
  }

  public analyzeAll(appSettings: IAppSettings) {
    return this.analyze(this.data, appSettings);
  }

  private analyze(dataChunk: IAnalyticsData[], appSettings: IAppSettings) {
    const result = new AnalyticsResult(appSettings);
    for (let i = 0; i < dataChunk.length; i++) {
      const current = dataChunk[i];
      result.words += 1;
      result.timeNeeded += current.timeNeeded ? current.timeNeeded : 0;
      if (current.word !== current.correctWord && current.word) {
        result.failedWords.push({
          correct: current.correctWord,
          actual: current.word
        });
        result.mistakes += 1;
      } else {
        result.correctWordCharacters += current.word.length + 1;
      }
      result.allWordCharacters += current.word.length + 1;
    }
    this.prevChunkStart = this.prevChunkEnd;

    result.wpm = Math.round((result.words - result.mistakes) * (100 * 60000 / result.timeNeeded) / 100);
    result.wpm_standard = Math.round(result.correctWordCharacters / 5
      * (100 * 60000 / result.timeNeeded) / 100);
    return result;
  }
}
