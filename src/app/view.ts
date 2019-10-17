import IDB from './shared/IndexedDb';
import * as IDBQueries from './shared/TypingSchoolIndexedDbQueries';
import { Language, languages, Mode, modes } from './shared/TypingTest';
import * as ViewHelp from './shared/ViewHelp';

export class Text {
  protected node: HTMLElement;
  constructor() {
      this.node = document.getElementById('words');
  }
  public set(textChunk) {
    this.node.innerHTML = ViewHelp.getTextChunk(textChunk);
    this.highlightCurrent(0);
  }

  public nextWordHighlight(nthChild) {
    this.node.getElementsByClassName('word')[nthChild].classList.replace('current', 'done');
    this.node.getElementsByClassName('word')[nthChild + 1].classList.add('current');
  }

  public highlightCurrent(nthChild) {
    this.node.getElementsByClassName('word')[nthChild].classList.add('current');
  }

  public highlightPrevious(nthChild) {
    this.node.getElementsByClassName('word')[nthChild].classList.replace('current', 'done');
  }
}

export class UserInput {
  public keyDownEventHandler: EventListener;
  public keyUpEventHandler: EventListener;
  public node: HTMLInputElement;

  constructor(keyDownEventHandler, keyUpEventHandler) {
    this.node = document.getElementsByTagName('input')[0];
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
  public node: HTMLElement;
  constructor() {
    this.node = document.getElementById('refreshText');
  }
}

export class Timer {
  protected node: HTMLElement;
  protected intervalId: any;
  constructor() {
    this.node = document.getElementById('timer');
    this.node.innerText = '0';
    // this.intervalId = 0;
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
  protected node: HTMLElement;
  protected tableNode: Element;
  constructor() {
    this.node = document.getElementById('last_100_results');
  }
  public setTable(data) {
    this.node.append(ViewHelp.getAnalyticsResultsTable(data));
    this.tableNode = this.node.getElementsByClassName('results-table')[0];
  }
  public prependToTable(resultRow) {
    if (this.tableNode) {
      this.tableNode.children[1].prepend(ViewHelp.getAnalyticsResultsTableRowNode(resultRow));
    } else {
      this.setTable([resultRow]);
    }
  }
}

export class DownLoadResultsButton {
  protected node: HTMLButtonElement;
  protected idb: IDBDatabase;
  constructor() {
    this.node = this.findButton();
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

  private findButton(): HTMLButtonElement {
    const buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].getAttribute('name') === 'downloadResults') {
        buttons[i].name += appMarkBinded;
        return buttons[i];
      }
    }
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
