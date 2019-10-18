export type TypingTestsType = string[];
export type Language = 'en' | 'si';
export const languages: Language[] = ['en', 'si'];
export type Mode = '200' | '1000';
export const modes: Mode[] = ['200', '1000'];

export type ExcerciseType = '10fastfingers';

export interface ITypingTest {
  wordCount: number;
  text: TypingTestsType;
  startTime: number;
  currentWordTimeCounter: number;
}

export class TypingTest {
  protected wordCount: number;
  protected startTime: number;
  protected currentWordTimeStart: number;
  protected text: TypingTestsType;

  constructor() {
    this.wordCount = 0;
  }

  public setNew(textChunk: string[]) {
    this.wordCount = 0;
    this.text = textChunk;
  }

  public start() {
    this.startTime = Date.now();
    this.currentWordTimeStart = this.startTime;
  }

  public pause() {
    // console.log('pausing...');
  }

  public get timePassed() {
    return Date.now() - this.startTime;
  }

  public get currentWord() {
    return this.text[this.wordCount];
  }

  public get currentWordCount() {
    return this.wordCount;
  }

  public get currentWordTime() {
    return this.currentWordTimeStart;
  }

  public nextWord(typedWord: string, nowDate: number) {
    // analytics.insert(typedWord, this.text[this.wordCount], newDate - this.currentWordTimeCounter);
    this.currentWordTimeStart = nowDate;
    this.wordCount++;
  }

  // public analyze() {
  //   return analytics.analyzePrevious();
  // }
  //
  // public getLast100Results() {
  //   return analytics.getLast100Results();
  // }
}
