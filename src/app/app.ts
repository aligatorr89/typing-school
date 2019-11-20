import { getTypingTests } from './shared/Api';
import { appSettingsInitialState, IAppSettings } from './shared/App';
import { ExcerciseType, Language, Mode, TypingTestsType } from './shared/TypingTest';

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

  get currentSettings(): IAppSettings {
    return this.settings;
  }

  public setMode(mode: Mode) {
    this.settings.mode = mode;
    this.getData(this.settings)
    .then((res) => this.node.dispatchEvent(new Event('setMode')));
  }
  get currentLanguage() {
    return this.settings.language;
  }
  public setLanguage(language: Language) {
    this.settings.language = language;
    this.getData(this.settings)
    .then((res) => this.node.dispatchEvent(new Event('setLanguage')));
  }
  public newTextChunk() {
    this.currentChunkIndex = Math.round(Math.random() * 1000);
    this.currentTextChunk = this.textData[this.currentChunkIndex].split('|');
    return this.currentTextChunk;
  }
  public setTextChunk(textId: number) {
    this.currentChunkIndex = textId - 1;
    this.currentTextChunk = this.textData[this.currentChunkIndex].split('|');
    return this.currentTextChunk;
  }
  get textChunk() {
    return this.currentTextChunk ? this.currentTextChunk : [];
  }
  get textChunkId() {
    return this.currentChunkIndex + 1;
  }
  public getData(settings: IAppSettings = this.settings) {
    return getTypingTests(settings.language, settings.mode)
    .then((data) => {
      this.textData = data.split('\n');
      return data;
    })
    .catch((error) => error);
  }
}
export default App;
