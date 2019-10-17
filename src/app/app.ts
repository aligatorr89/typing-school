import { getTypingTests } from './shared/Api';
import { ExcerciseType, Language, Mode, TypingTest, TypingTestsType } from './shared/TypingTest';

class App {
  public node: HTMLElement;
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
    this.node = document.getElementById('app');
    this.language = language;
    this.mode = mode;
    this.disableCorrection = disableCorrection;
    this.excerciseType = excerciseType;
    this.textData = [];
    this.setLanguage = this.setLanguage.bind(this);
  }

  public setMode(mode: Mode) {
    this.mode = mode;
  }
  get currentLanguage() {
    return this.language;
  }
  public setLanguage(language: Language) {
    this.language = language;
    this.getData(language)
    .then((res) => this.node.dispatchEvent(new Event('setLanguage')));
  }
  public newTextChunk() {
    this.currentChunkIndex = Math.round(Math.random() * 1000);
    this.currentTextChunk = this.textData[this.currentChunkIndex].split('|');
    return this.currentTextChunk;
  }
  get textChunk() {
    return this.currentTextChunk ? this.currentTextChunk : [];
  }
  public getData(language: Language = 'en') {
    return getTypingTests(language)
    .then((data) => {
      this.textData = data.split('\n');
      return data;
    })
    .catch((error) => error);
  }
}
export default App;
