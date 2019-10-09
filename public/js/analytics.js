export class Analytics {
  constructor() {
    this.data = [];
    this.prevChunkStart = 0;
    this.prevChunkEnd = 0;
  }

  insert(word, correctWord, timeNeeded) {
    this.data.push({
      word, correctWord, timeNeeded
    });
  }

  analyzePrevious() {
    this.prevChunkEnd = this.data.length - 1;
    const previous = this.data.slice(this.prevChunkStart, this.prevChunkEnd);
    const result = {
      words: 0,
      timeNeeded: 0,
      mistakes: 0
    };
    for(let i = 0; i < previous.length; i++) {
      const current = previous[i];
      result.words += 1;
      result.timeNeeded += current.timeNeeded ? current.timeNeeded : 0;
      result.mistakes += current.word === current.correctWord && current.word ? 0 : 1;
    }
    this.prevChunkStart = this.prevChunkEnd;

    result.wpm = Math.round((result.words - result.mistakes) * (100 * 60000 / result.timeNeeded) / 100);
    return result;
  }
}
