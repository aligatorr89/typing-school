import { Analytics } from './analytics';

class App {
  constructor(language = 'en', mode = '', disableCorrection = true, excerciseType = '10fastfingers') {
    this.language = language;
    this.mode = mode;
    this.disableCorrection = disableCorrection;
    this.excerciseType = excerciseType;
    this.textData = null;
    this.analytics = new Analytics();
  };
}
App.prototype.getMode = function() {
  return this.mode;
};
App.prototype.setMode = function(mode) {
  this.mode = mode;
};
App.prototype.getLanguage = function() {
  return this.language;
};
App.prototype.setLanguage = function(language) {
  this.language = language;
};
App.prototype.setTextData = function(text) {
  this.textData = text.split('\n');
  for(let i = 0; i < this.textData.length; i++) {
    this.textData[i] = this.textData[i].split('|');
  }
};
App.prototype.getTextChunk = function() {
  this.currentChunkIndex = Math.round(Math.random() * 1000);
  return this.textData[this.currentChunkIndex];
};
App.prototype.analyizeWord = function(word, correctWordIndex, timeNeeded) {
  var correctWord = this.textData[this.currentChunkIndex][correctWordIndex];
  word = word.replace(' ', '');
  this.analytics.insert(word, correctWord, timeNeeded);
};
App.prototype.analyzePrevious = function() {
  return this.analytics.analyzePrevious();
}

export default App;
