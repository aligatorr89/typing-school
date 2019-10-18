import { getTypingTests } from './shared/Api';
import { ExcerciseType, Language, Mode, TypingTest, TypingTestsType } from './shared/TypingTest';

export interface IAppSettings {
  language: Language;
  mode: Mode;
  excerciseType: ExcerciseType;
}

export const appSettingsInitialState: IAppSettings = {
  language: 'en',
  mode:  '',
  excerciseType: '10fastfingers'
};

class App {
  public node: HTMLElement;
  protected settings: IAppSettings;
  protected textData: TypingTestsType;
  protected currentChunkIndex: number;
  protected currentTextChunk: string[];
  constructor(settings: IAppSettings = appSettingsInitialState) {
    this.settings = {...appSettingsInitialState, ...settings};
    this.node = document.getElementById('app');
    this.textData = [];
    this.setLanguage = this.setLanguage.bind(this);
    this.setMode = this.setMode.bind(this);
  }

  public setMode(mode: Mode) {
    this.settings.mode = mode;
    this.getData(this.settings.language, mode)
    .then((res) => this.node.dispatchEvent(new Event('setMode')));
  }
  get currentLanguage() {
    return this.settings.language;
  }
  public setLanguage(language: Language) {
    this.settings.language = language;
    this.getData(language, this.settings.mode)
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
  public getData(language: Language = 'en', mode: Mode = '') {
    return getTypingTests(language, mode)
    .then((data) => {
      this.textData = data.split('\n');
      return data;
    })
    .catch((error) => error);
  }
}
export default App;
