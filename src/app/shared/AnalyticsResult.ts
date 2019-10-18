import { appSettingsInitialState, IAppSettings } from '../app';
import { ExcerciseType, Language, Mode } from './TypingTest';

export const analyticsResultsKeys = ['id', 'words', 'timeNeeded', 'mistakes',
'correctWordCharacters', 'allWordCharacters', 'failedWords', 'wpm', 'wpm_standard'];

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
