import indexedDb from './indexedDB';

export class Analytics {
  constructor() {
    this.data = [];
    this.prevChunkStart = 0;
    this.prevChunkEnd = 0;
    this.dbConnection = new indexedDb();
  }

  insert(word, correctWord, timeNeeded) {
    word = word.replace(' ', '');
    this.data.push({
      word, correctWord, timeNeeded
    });
  }

  analyzePrevious() {
    this.prevChunkEnd = this.data.length;
    const previous = this.data.slice(this.prevChunkStart, this.prevChunkEnd);
    const result = {
      words: 0,
      timeNeeded: 0,
      mistakes: 0,
      correctWordCharacters: 0,
      allWordCharacters: 0,
      failedWords: []
    };
    for(let i = 0; i < previous.length; i++) {
      const current = previous[i];
      result.words += 1;
      result.timeNeeded += current.timeNeeded ? current.timeNeeded : 0;
      if(current.word !== current.correctWord && current.word) {
        result.failedWords.push({
          correct: current.correctWord,
          actual: current.word
        });
        result.mistakes += 1;
      }
      else {
        result.correctWordCharacters += current.word.length + 1;
      }
      result.allWordCharacters += current.word.length + 1;
    }
    this.prevChunkStart = this.prevChunkEnd;

    result.wpm = Math.round((result.words - result.mistakes) * (100 * 60000 / result.timeNeeded) / 100);
    result.wpm_standard = Math.round(result.correctWordCharacters / 5
      * (100 * 60000 / result.timeNeeded) / 100);
    this.dbConnection.insertData('analytics', result);
    return result;
  }

  getLast100Results() {
    return this.dbConnection.getData('analytics')
    .then(res => {
      const startIndex = res.length < 101 ? 0 : res.length - 100;
      return res.slice(startIndex, res.length).reverse();
    });
  }
}
