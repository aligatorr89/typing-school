import * as IDBQueries from './shared/TypingSchoolIndexedDbQueries';
import IDB from './shared/IndexedDb';
import { Language, languages } from './shared/TypingTest';

export class Text {
  node: HTMLElement;
  constructor() {
      this.node = document.getElementById('words');
  }
  set(textChunk) {
    this.node.innerHTML = text(textChunk);
    this.highlightCurrent(0);
  }

  nextWordHighlight(nthChild) {
    this.node.getElementsByClassName('word')[nthChild].classList.replace('current', 'done');
    this.node.getElementsByClassName('word')[nthChild + 1].classList.add('current');
  }

  highlightCurrent(nthChild) {
    this.node.getElementsByClassName('word')[nthChild].classList.add('current');
  }

  highlightPrevious(nthChild) {
    this.node.getElementsByClassName('word')[nthChild].classList.replace('current', 'done');
  }
}

export class UserInput {
  node: HTMLInputElement;
  keyDownEventHandler: EventListener;
  keyUpEventHandler: EventListener;
  constructor(keyDownEventHandler, keyUpEventHandler) {
    this.node = document.getElementsByTagName('input')[0];
    this.keyDownEventHandler = keyDownEventHandler;
    this.keyUpEventHandler = keyUpEventHandler;
  }

  setUp() {
    this.node.focus();
    this.addKeyDownListener();
    this.addKeyUpListener();
  }

  tearDown() {
    this.removeKeyDownListener();
    this.node.value = '';
    this.node.focus();
  }

  addKeyDownListener() {
    this.node.addEventListener('keydown', this.keyDownEventHandler);
  }

  addKeyUpListener() {
    this.node.addEventListener('keyup', this.keyUpEventHandler);
  }

  removeKeyUpListener() {
    this.node.removeEventListener('keyup', this.keyUpEventHandler);
  }

  removeKeyDownListener() {
    this.node.removeEventListener('keydown', this.keyDownEventHandler);
  }
}

export class RefreshButton {
  node: HTMLElement;
  constructor() {
    this.node = document.getElementById('refreshText');
  }
}

export class Timer {
  node: HTMLElement;
  intervalId: any;
  constructor() {
    this.node = document.getElementById('timer');
    this.node.innerText = '0';
    // this.intervalId = 0;
  }

  set() {
    let seconds = 0;
    const node = this.node;
    this.intervalId = setInterval(function() {
        node.innerText = ++seconds + '';
    }, 1000);
  }

  unset() {
    clearInterval(this.intervalId);
    this.node.innerText = '0';
  }
}

export class Results {
  node: HTMLElement;
  tableNode: Element;
  constructor() {
    this.node = document.getElementById('last_100_results');
  }
  setTable(data) {
    this.node.append(getResultsTable(data));
    this.tableNode = this.node.getElementsByClassName('results-table')[0];
  }
  prependToTable(resultRow) {
    if(this.tableNode) {
      this.tableNode.children[1].prepend(getResultsTableRowNode(resultRow));
    }
    else {
      this.setTable([resultRow]);
    }
  }
}

export class DownLoadResultsButton {
  node: HTMLButtonElement;
  idb: IDBDatabase;
  constructor() {
    this.node = this.findButton();
    this.node.addEventListener('click', this.clickHandler);
    this.clickHandler = this.clickHandler.bind(this);
  }

  private clickHandler(event: Event) {
    IDBQueries.getAllData(IDB.db).then((data) => {
      const element = document.createElement('a');

      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)));
      element.setAttribute('download', 'TypingSchoolData.json');

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    })
    .catch(error => console.log(error));
  }

  private findButton(): HTMLButtonElement {
    const buttons = document.getElementsByTagName('button');
    for(let i = 0; i < buttons.length; i++) {
      if (buttons[i].getAttribute('name') === 'downloadResults') {
        buttons[i].name += appMarkBinded;
        return buttons[i];
      }
    }
  }
}

export class LanguageSelect {
  private static elementName: string = 'selectLanguage';
  node: HTMLSelectElement;
  constructor() {
    this.node = this.findElement();
    this.setOptions();
  }

  public setOptions() {
    for(let i = 0; i < languages.length; i++) {
      const option = document.createElement('option');
      option.value = languages[i];
      option.textContent = languages[i];
      this.node.appendChild(option);
    }
  }

  private findElement(): HTMLSelectElement {
    const selects = document.getElementsByTagName('select');
    for(let i = 0; i < selects.length; i++) {
      if (selects[i].name === LanguageSelect.elementName) {
        selects[i].name += appMarkBinded;
        return selects[i];
      }
    }
  }
}

const resultsTableKeys = ['id', 'words', 'timeNeeded','mistakes',
'correctWordCharacters','allWordCharacters','failedWords' ,'wpm','wpm_standard'];
function getResultsTable(data) {
  const node = document.createElement('table');
  node.setAttribute('class', 'results-table');
  let table = '<thead><tr>';
  for(let i = 0; i < resultsTableKeys.length; i++) {
    table += '<th class="text-center border">' + resultsTableKeys[i] + '</th>';
  }
  table += '</thead></tr><tbody>';
  if(!Array.isArray(data)) return '';

  for(let i = 0; i < data.length; i++) {
    table += resultsTableRow(data[i]);
  }
  table += '</tbody>';
  node.innerHTML = table;
  return node;
}

function resultsTableRow(row) {
  let tr = '<tr class="text-center">';
  for(let j = 0; j < resultsTableKeys.length; j++) {
    tr += '<td class="border">' + JSON.stringify(row[resultsTableKeys[j]]) + '</td>';
  }
  tr += '</tr>';
  return tr;
}

function getResultsTableRowNode(row) {
  const tr = document.createElement('tr');
  tr.className = 'text-center';
  let str = '';
  for(let j = 0; j < resultsTableKeys.length; j++) {
    str += '<td class="border">' + JSON.stringify(row[resultsTableKeys[j]]) + '</td>';
  }
  tr.innerHTML = str;
  return tr;
}

function text(textChunk) {
  let html = '';
  for(let i = 0; i < textChunk.length; i++) {
    html += '<span class="word">' + textChunk[i] + '&nbsp;</span> ';
  }
  return html;
}

export const appMarkBinded = ' ra-b';
