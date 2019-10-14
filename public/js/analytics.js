import indexedDb from './indexedDB';

export class Analytics {
  constructor() {
    this.data = [];
    this.prevChunkStart = 0;
    this.prevChunkEnd = 0;
    this.idb = new indexedDb();
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
    this.idb.insertData('analytics', result);
    return result;
  }

  getLast100Results() {
    return new Promise((resolve, reject) => {
      const store = this.idb.getObjectStore('analytics');
      var req = store.openCursor(null, 'prev');
      const result = [];
      let count = 0;
      req.onsuccess = function () {
        const cursor = req.result;
        if(cursor && count < 100) {
          if(cursor.value.words > 3) {
            result.push(cursor.value);
            count++;
          }
          cursor.continue();
        }
        else {
          resolve(result);
        }
      };
      req.onerror = function() {
        console.log('IDB.getQuery() error', req.error);
        reject(req.error);
      };
    });
  }
}
