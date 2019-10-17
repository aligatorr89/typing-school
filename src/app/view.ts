import IDB from './shared/IndexedDb';
import * as IDBQueries from './shared/TypingSchoolIndexedDbQueries';
import { Language, languages } from './shared/TypingTest';

export class Text {
  protected node: HTMLElement;
  constructor() {
      this.node = document.getElementById('words');
  }
  public set(textChunk) {
    this.node.innerHTML = text(textChunk);
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
    this.node.append(getResultsTable(data));
    this.tableNode = this.node.getElementsByClassName('results-table')[0];
  }
  public prependToTable(resultRow) {
    if (this.tableNode) {
      this.tableNode.children[1].prepend(getResultsTableRowNode(resultRow));
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
  protected node: HTMLSelectElement;
  constructor() {
    this.node = this.findElement();
    this.setOptions();
  }

  public setOptions() {
    for (let i = 0; i < languages.length; i++) {
      const option = document.createElement('option');
      option.value = languages[i];
      option.textContent = languages[i];
      this.node.appendChild(option);
    }
  }

  private findElement(): HTMLSelectElement {
    const selects = document.getElementsByTagName('select');
    for (let i = 0; i < selects.length; i++) {
      if (selects[i].name === LanguageSelect.elementName) {
        selects[i].name += appMarkBinded;
        return selects[i];
      }
    }
  }
}

const resultsTableKeys = ['id', 'words', 'timeNeeded', 'mistakes',
'correctWordCharacters', 'allWordCharacters', 'failedWords', 'wpm', 'wpm_standard'];
function getResultsTable(data) {
  const node = document.createElement('table');
  node.setAttribute('class', 'results-table');
  let table = '<thead><tr>';
  for (let i = 0; i < resultsTableKeys.length; i++) {
    table += '<th class="text-center border">' + resultsTableKeys[i] + '</th>';
  }
  table += '</thead></tr><tbody>';
  if (!Array.isArray(data)) {
    return '';
  }

  for (let i = 0; i < data.length; i++) {
    table += resultsTableRow(data[i]);
  }
  table += '</tbody>';
  node.innerHTML = table;
  return node;
}

function resultsTableRow(row) {
  let tr = '<tr class="text-center">';
  for (let j = 0; j < resultsTableKeys.length; j++) {
    tr += '<td class="border">' + JSON.stringify(row[resultsTableKeys[j]]) + '</td>';
  }
  tr += '</tr>';
  return tr;
}

function getResultsTableRowNode(row) {
  const tr = document.createElement('tr');
  tr.className = 'text-center';
  let str = '';
  for (let j = 0; j < resultsTableKeys.length; j++) {
    str += '<td class="border">' + JSON.stringify(row[resultsTableKeys[j]]) + '</td>';
  }
  tr.innerHTML = str;
  return tr;
}

function text(textChunk) {
  let html = '';
  for (let i = 0; i < textChunk.length; i++) {
    html += '<span class="word">' + textChunk[i] + '&nbsp;</span> ';
  }
  return html;
}

export const appMarkBinded = ' ra-b';
