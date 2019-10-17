import { analyticsResultsKeys } from './AnalyticsResult';
import { Language, Mode } from './TypingTest';

export const appMarkBinded = ' ra-b';

export function findSelectElement(elementName: string): HTMLSelectElement {
  const elements = document.getElementsByTagName('select');
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].name === elementName) {
      elements[i].name += appMarkBinded;
      return elements[i];
    }
  }
}

export function setSelectElementOptions(node: HTMLSelectElement, array: Array<Language | Mode>) {
  for (let i = 0; i < array.length; i++) {
    const option = document.createElement('option');
    option.value = array[i];
    option.textContent = array[i];
    node.appendChild(option);
  }
}

export function getAnalyticsResultsTable(data) {
  const node = document.createElement('table');
  node.setAttribute('class', 'results-table');
  let table = '<thead><tr>';
  for (let i = 0; i < analyticsResultsKeys.length; i++) {
    table += '<th class="text-center border">' + analyticsResultsKeys[i] + '</th>';
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

export function resultsTableRow(row) {
  let tr = '<tr class="text-center">';
  for (let j = 0; j < analyticsResultsKeys.length; j++) {
    tr += '<td class="border">' + JSON.stringify(row[analyticsResultsKeys[j]]) + '</td>';
  }
  tr += '</tr>';
  return tr;
}

export function getAnalyticsResultsTableRowNode(row) {
  const tr = document.createElement('tr');
  tr.className = 'text-center';
  let str = '';
  for (let j = 0; j < analyticsResultsKeys.length; j++) {
    str += '<td class="border">' + JSON.stringify(row[analyticsResultsKeys[j]]) + '</td>';
  }
  tr.innerHTML = str;
  return tr;
}

export function getTextChunk(textChunk) {
  let html = '';
  for (let i = 0; i < textChunk.length; i++) {
    html += '<span class="word">' + textChunk[i] + '&nbsp;</span> ';
  }
  return html;
}
