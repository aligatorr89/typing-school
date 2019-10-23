import { IAnalyticsResult } from './shared/AnalyticsResult';
import IDB from './shared/IndexedDb';
import * as IDBQueries from './shared/TypingSchoolIndexedDbQueries';
import { Language, languages, Mode, modes, TypingTestsType } from './shared/TypingTest';
import * as ViewHelp from './shared/ViewHelp';
import * as AnalyticsResultsViewHelp from './view/analytics-results';
import * as TextViewHelp from './view/text-chunk';

export class Text {
  protected node: HTMLDivElement;
  private isSet: boolean = false;
  private currentIndex = 0;
  constructor() {
    this.node = document.getElementById('words') as HTMLDivElement;
  }
  public set(textChunk: TypingTestsType) {
    if (this.isSet) {
      TextViewHelp.setTextChunk(this.node, textChunk, this.currentIndex);
    } else {
      TextViewHelp.renderTextChunk(this.node, textChunk);
      this.isSet = true;
    }
    this.currentIndex = 0;
    this.node.children[0].classList.add('current');
  }

  public nextWordHighlight() {
    this.highlightCurrent();
    this.highlightNext();
    this.currentIndex++;
  }

  private highlightCurrent() {
    this.node.children[this.currentIndex].classList.replace('current', 'done');
  }

  private highlightNext() {
    if (this.node.children[this.currentIndex + 1]) {
      this.node.children[this.currentIndex + 1].classList.add('current');
    }
  }
}

export class UserInput {
  public keyDownEventHandler: EventListener;
  public keyUpEventHandler: EventListener;
  public node: HTMLInputElement;

  constructor(keyDownEventHandler, keyUpEventHandler) {
    this.node = document.getElementById('typing') as HTMLInputElement;
    this.keyDownEventHandler = keyDownEventHandler;
    this.keyUpEventHandler = keyUpEventHandler;
  }

  public setUp() {
    this.node.focus();
    this.addKeyDownListener();
    this.addKeyUpListener();
  }

  public tearDown() {
    this.removeKeyDownListener();
    this.node.value = '';
    this.node.focus();
  }

  public addKeyDownListener() {
    this.node.addEventListener('keydown', this.keyDownEventHandler);
  }

  public addKeyUpListener() {
    this.node.addEventListener('keyup', this.keyUpEventHandler);
  }

  public removeKeyUpListener() {
    this.node.removeEventListener('keyup', this.keyUpEventHandler);
  }

  public removeKeyDownListener() {
    this.node.removeEventListener('keydown', this.keyDownEventHandler);
  }
}

export class RefreshButton {
  public node: HTMLButtonElement;
  constructor() {
    this.node = document.getElementById('refreshText') as HTMLButtonElement;
  }
}

export class Timer {
  protected node: HTMLElement;
  protected intervalId: any;
  constructor() {
    this.node = document.getElementById('timer') as HTMLElement;
    this.node.innerText = '0';
  }

  public set() {
    let seconds = 0;
    this.intervalId = setInterval(() => {
        this.node.innerText = ++seconds + '';
    }, 1000);
  }

  public unset() {
    clearInterval(this.intervalId);
    this.node.innerText = '0';
  }
}

export class Results {
  protected node: HTMLDivElement;
  protected tableNode: HTMLTableElement;
  constructor() {
    this.node = document.getElementById('last_100_results') as HTMLDivElement;
  }
  public setTable(data: IAnalyticsResult[]) {
    this.tableNode = AnalyticsResultsViewHelp.getTable(data);
    this.node.append(this.tableNode);
  }
  public replaceTable(data: IAnalyticsResult[]) {
    AnalyticsResultsViewHelp.replaceTable(this.tableNode, data);
  }
  public prependToTable(resultRow: IAnalyticsResult) {
    if (this.tableNode) {
      this.tableNode.children[1].prepend(AnalyticsResultsViewHelp.getTableRow(resultRow));
    } else {
      this.setTable([resultRow]);
    }
  }
}

export class DownLoadResultsButton {
  protected node: HTMLButtonElement;
  constructor() {
    this.node = ViewHelp.findButtonElement('downloadResults');
    this.node.addEventListener('click', this.clickHandler);
    this.clickHandler = this.clickHandler.bind(this);
  }

  private clickHandler(event: Event) {
    IDBQueries.getAllData(IDB.db)
    .then((data) => {
      const element = document.createElement('a');

      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)));
      element.setAttribute('download', 'TypingSchoolData.json');

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    })
    .catch((error) => console.log(error));
  }
}

export class LanguageSelect {
  private static elementName: string = 'selectLanguage';
  public setLanguage: any;
  protected node: HTMLSelectElement;
  constructor(setLanguage: (lang: Language) => void) {
    this.node = ViewHelp.findSelectElement(LanguageSelect.elementName);
    this.setLanguage = setLanguage;
    ViewHelp.setSelectElementOptions(this.node, languages);
    this.clickEventHandler = this.clickEventHandler.bind(this);
    this.node.addEventListener('change', this.clickEventHandler);
  }

  public clickEventHandler() {
    this.setLanguage(this.node.value);
  }
}

export class ModeSelect {
  private static elementName: string = 'selectMode';
  public setMode: any;
  protected node: HTMLSelectElement;
  constructor(setMode: (mode: Mode) => void) {
    this.node = ViewHelp.findSelectElement(ModeSelect.elementName);
    this.node.style.display = '';
    this.setMode = setMode;
    ViewHelp.setSelectElementOptions(this.node, modes);
    this.clickEventHandler = this.clickEventHandler.bind(this);
    this.node.addEventListener('change', this.clickEventHandler);
  }

  public clickEventHandler() {
    this.setMode(this.node.value);
  }
}

export const appMarkBinded = ' ra-b';
