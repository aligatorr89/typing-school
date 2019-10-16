export interface IAnalyticsResult {
  textId: number;
  words: number;
  timeNeeded: number;
  mistakes: number;
  failedWords: IAnalyticsResultFailedWords[];
  correctWordCharacters: number;
  allWordCharacters: number;
  wpm: number;
  wpm_standard: number;
}

export interface IAnalyticsResultFailedWords {
  correct: string;
  actual: string;
}

export class AnalyticsResult implements IAnalyticsResult {
  public textId: number;
  public words: number;
  public timeNeeded: number;
  public mistakes: number;
  public failedWords: IAnalyticsResultFailedWords[];
  public correctWordCharacters: number;
  public allWordCharacters: number;
  public wpm: number;
  public wpm_standard: number;
  constructor() {
    this.textId = 0;
    this.words = 0;
    this.timeNeeded = 0;
    this.mistakes = 0;
    this.failedWords = [];
    this.correctWordCharacters = 0;
    this.allWordCharacters = 0;
    this.wpm = 0;
    this.wpm_standard = 0;
  }
}
