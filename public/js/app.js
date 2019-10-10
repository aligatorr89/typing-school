import { getTextData } from './api';

class App {
  constructor(language = 'en', mode = '', disableCorrection = true, excerciseType = '10fastfingers') {
    this.language = language;
    this.mode = mode;
    this.disableCorrection = disableCorrection;
    this.excerciseType = excerciseType;
    this.textData = [];
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
App.prototype.getCurrentTextChunk = function() {
  return this.textData[this.currentChunkIndex] ? this.textData[this.currentChunkIndex] : [];
};
App.prototype.getData = function() {
  return getTextData()
  .then(data => {
    this.setTextData(data);
    return true;
  })
  .catch(error => error)
};
export default App;
