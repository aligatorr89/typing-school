import { getTypingTests } from './shared/Api';
import { TypingTest, Language, Mode, ExcerciseType, TypingTestsType } from './shared/TypingTest';

class App {
  language: string;
  mode: Mode;
  disableCorrection: boolean;
  excerciseType: ExcerciseType;
  textData: TypingTestsType;
  currentChunkIndex: number;
  currentTextChunk: string[];
  constructor(language: Language = 'en', mode: Mode = '', disableCorrection: boolean = true, excerciseType: ExcerciseType = '10fastfingers') {
    this.language = language;
    this.mode = mode;
    this.disableCorrection = disableCorrection;
    this.excerciseType = excerciseType;
    this.textData = [];
  };
  getMode() {
    return this.mode;
  };
  setMode(mode) {
    this.mode = mode;
  };
  getLanguage() {
    return this.language;
  };
  setLanguage(language) {
    this.language = language;
  };
  getTextChunk() {
    this.currentChunkIndex = Math.round(Math.random() * 1000);
    this.currentTextChunk = this.textData[this.currentChunkIndex].split('|');
    return this.currentTextChunk;
  };
  getCurrentTextChunk() {
    return this.currentTextChunk ? this.currentTextChunk : [];
  };
  getData() {
    return getTypingTests()
    .then(data => {
      this.textData = data.split('\n');
      return true;
    })
    .catch(error => error)
  };
}
export default App;
