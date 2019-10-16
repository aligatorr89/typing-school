
export class Text {
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
  constructor(keyDownEventHandler, keyUpEventHandler) {
    this.node = document.getElementById('typing');
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
  constructor() {
    this.node = document.getElementById('refreshText');
  }
}

export class Timer {
  constructor() {
    this.node = document.getElementById('timer');
    this.intervalId = 0;
  }

  set() {
    let seconds = 0;
    const node = this.node;
    this.intervalId = setInterval(function() {
        node.innerText = ++seconds;
    }, 1000);
  }

  unset() {
    clearInterval(this.intervalId);
    this.node.innerText = 0;
  }
}

export class Results {
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
