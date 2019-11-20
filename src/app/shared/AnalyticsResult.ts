import { IAnalyticsData } from './Analytics';
import { IAppSettings } from './App';
import { ExcerciseType, Language, Mode } from './TypingTest';

export const analyticsResultsKeys = ['id', 'words', 'timeNeeded', 'mistakes',
'correctWordCharacters', 'allWordCharacters', 'failedWords', 'wpm', 'wpm_standard', 'textId'];

export interface IAnalyticsResult {
  id?: number;
  textId: number;
  words: number;
  timeNeeded: number;
  mistakes: number;
  failedWords: IAnalyticsResultFailedWords[];
  correctWordCharacters: number;
  allWordCharacters: number;
  wpm: number;
  wpm_standard: number;
  language: Language;
  mode: Mode;
  excerciseType: ExcerciseType;
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
  public language: Language;
  public mode: Mode;
  public excerciseType: ExcerciseType;
  constructor(appSettings: IAppSettings) {
    this.textId = 0;
    this.words = 0;
    this.timeNeeded = 0;
    this.mistakes = 0;
    this.failedWords = [];
    this.correctWordCharacters = 0;
    this.allWordCharacters = 0;
    this.wpm = 0;
    this.wpm_standard = 0;
    this.mode = appSettings.mode;
    this.language = appSettings.language;
    this.excerciseType = appSettings.excerciseType;
  }
}

export class AnalyticsResultHelp {
  public static analyze(data: IAnalyticsData[], appSettings: IAppSettings): IAnalyticsResult {
    const result = new AnalyticsResult(appSettings);
    result.textId = data.length ? data[0].textId : 0;
    for (let i = 0; i < data.length; i++) {
      const current = data[i];
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

    result.wpm = Math.round((result.words - result.mistakes) * (100 * 60000 / result.timeNeeded) / 100);
    result.wpm_standard = Math.round(result.correctWordCharacters / 5
      * (100 * 60000 / result.timeNeeded) / 100);
    return result;
  }
}
