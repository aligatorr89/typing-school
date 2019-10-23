import { analyticsResultsKeys } from '../shared/AnalyticsResult';

export function getTable(data) {
  const table = document.createElement('table');
  table.classList.add('results-table', 'text-center');

  const thead = document.createElement('thead');
  const tr = document.createElement('tr');

  for (let i = 0; i < analyticsResultsKeys.length; i++) {
    const th = document.createElement('th');
    th.classList.add('text-center', 'border');
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

export function getTableRow(row) {
  const tr = document.createElement('tr');
  for (let j = 0; j < analyticsResultsKeys.length; j++) {
    const td = document.createElement('td');
    td.classList.add('border');
    td.textContent = JSON.stringify(row[analyticsResultsKeys[j]]);
    tr.appendChild(td);
  }
  return tr;
}
