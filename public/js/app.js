
function App(language = 'en', mode = '', disableCorrection = true, excerciseType = '10fastfingers') {
  this.language = language;
  this.mode = mode;
  this.disableCorrection = disableCorrection;
  this.excerciseType = excerciseType;
  this.text = null;
  this.statistics = [];
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
App.prototype.setText = function(text) {
  this.text = text.split('\n');
  for(let i = 0; i < this.text.length; i++) {
    this.text[i] = this.text[i].split('|');
  }
};
App.prototype.getTextChunk = function() {
  this.currentChunkIndex = Math.round(Math.random() * 1000);
  this.statistics.push({});
  return '<span class="word">' + this.text[this.currentChunkIndex].join('</span>&nbsp;<span class="word">') + '</span>';
};
App.prototype.checkCorrect = function(word, index) {
  var correctWord = this.text[this.currentChunkIndex][index];
  this.statistics[this.statistics.length - 1][correctWord] = word.replace(' ', '');
};

export default App;
