import { Analytics } from './analytics';

const analytics = new Analytics();

export class TypingTest {
  constructor(textChunk) {
    this.wordCount = 0;
    this.text = textChunk;
  }

  start() {
    this.setStartTime();
  }

  pause() {
    console.log('pausing...');
  }

  setStartTime() {
    this.startTime = Date.now();
    this.currentWordTimeCounter = this.startTime;
  }

  getTimePassed() {
    return Date.now() - this.startTime;
  }

  getCurrentWord() {
    return this.text[this.wordCount];
  }

  getCurrentWordCount() {
    return this.wordCount;
  }

  newWord(typedWord) {
    const newDate = Date.now();
    analytics.insert(typedWord, this.text[this.wordCount], newDate - this.currentWordTimeCounter);
    this.currentWordTimeCounter = newDate;
    this.wordCount++;
  }

  analyze() {
    return analytics.analyzePrevious();
  }

  getLast100Results() {
    return analytics.getLast100Results();
  }
}
