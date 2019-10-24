import { analyticsResultsKeys, IAnalyticsResult } from '../shared/AnalyticsResult';

export function getTable(data: IAnalyticsResult[]) {
  const table = document.createElement('table');
  table.classList.add('results-table');
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');

  for (let i = 0; i < analyticsResultsKeys.length; i++) {
    const th = document.createElement('th');
    th.textContent = analyticsResultsKeys[i];
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  for (let i = 0; i < data.length; i++) {
    tbody.appendChild(getTableRow(data[i]));
  }

  table.appendChild(tbody);
  return table;
}

export function replaceTable(parent: HTMLTableElement, data: IAnalyticsResult[]) {
  const tbody = parent.children[1];
  const trs = tbody.getElementsByTagName('tr');
  if (trs.length === data.length) {
    for (let i = 0; i < data.length; i++) {
      setTableRow(trs[i], data[i]);
    }
  } else if (trs.length > data.length) {
    for (let i = 0; i < data.length; i++) {
      setTableRow(trs[i], data[i]);
    }
    for (let i = trs.length - 1; i >= data.length; i--) {
      tbody.removeChild(trs[i]);
    }
  } else if (trs.length < data.length) {
    for (let i = 0; i < trs.length; i++) {
      setTableRow(trs[i], data[i]);
    }
    for (let i = trs.length; i < data.length; i++) {
      tbody.appendChild(getTableRow(data[i]));
    }
  }
}

export function getTableRow(row: IAnalyticsResult) {
  const tr = document.createElement('tr');
  for (let j = 0; j < analyticsResultsKeys.length; j++) {
    const td = document.createElement('td');
    td.textContent = JSON.stringify(row[analyticsResultsKeys[j]]);
    tr.appendChild(td);
  }
  return tr;
}

export function setTableRow(tr: HTMLTableRowElement, row) {
  const tds = tr.getElementsByTagName('td');
  for (let i = 0; i < analyticsResultsKeys.length; i++) {
    tds[i].textContent = JSON.stringify(row[analyticsResultsKeys[i]]);
  }
}
