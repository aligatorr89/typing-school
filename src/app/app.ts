import { getTypingTests } from './shared/Api';
import { ExcerciseType, Language, Mode, TypingTest, TypingTestsType } from './shared/TypingTest';

class App {
  protected language: string;
  protected mode: Mode;
  protected disableCorrection: boolean;
  protected excerciseType: ExcerciseType;
  protected textData: TypingTestsType;
  protected currentChunkIndex: number;
  protected currentTextChunk: string[];
  constructor(
    language: Language = 'en', mode: Mode = '',
    disableCorrection: boolean = true, excerciseType: ExcerciseType = '10fastfingers'
  ) {
    this.language = language;
    this.mode = mode;
    this.disableCorrection = disableCorrection;
    this.excerciseType = excerciseType;
    this.textData = [];
  }

  set newMode(mode) {
    this.mode = mode;
  }
  get currentLanguage() {
    return this.language;
  }
  set newLanguage(language) {
    this.language = language;
  }
  public newTextChunk() {
    this.currentChunkIndex = Math.round(Math.random() * 1000);
    this.currentTextChunk = this.textData[this.currentChunkIndex].split('|');
    return this.currentTextChunk;
  }
  get textChunk() {
    return this.currentTextChunk ? this.currentTextChunk : [];
  }
  public getData() {
    return getTypingTests()
    .then((data) => {
      this.textData = data.split('\n');
      return true;
    })
    .catch((error) => error);
  }
}
export default App;
