import { IAnalyticsResult } from './AnalyticsResult';
import { appSettingsInitialState, IAppSettings } from './App';
import { TypingSchoolTables } from './IndexedDb';

function getObjectStore(idb: IDBDatabase, table: TypingSchoolTables, mode: IDBTransactionMode = 'readonly') {
  return idb.transaction('analytics', mode).objectStore(table);
}

export function getLast100Results(
  idb: IDBDatabase, appSettings: IAppSettings = appSettingsInitialState): Promise<IAnalyticsResult[]> {
  return new Promise((resolve, reject) => {
    const store = idb.transaction('analytics', 'readonly').objectStore('analytics');

    const req = store.openCursor(null, 'prev');
    const result = [];
    let count = 0;
    req.onsuccess = () => {
      const cursor = req.result;
      if (cursor && count < 100) {
        const o: IAnalyticsResult = cursor.value;
        if (o.language === appSettings.language && o.mode === appSettings.mode && o.words > 3) {
          result.push(cursor.value);
          count++;
        }
        cursor.continue();
      } else {
        resolve(result);
      }
    };
    req.onerror = () => {
      console.log('IDBQueries.getLast100Results error', req.error);
      reject(req.error);
    };
  });
}

export function getAllData(idb: IDBDatabase): Promise<IAnalyticsResult[]> {
  return new Promise((resolve, reject) => {
    const store = idb.transaction('analytics', 'readonly').objectStore('analytics');

    const req: IDBRequest<IAnalyticsResult[]> = store.getAll();
    req.onsuccess = () => {
      resolve(req.result);
    };
    req.onerror = () => {
      console.log('IDBQueries.getAllData error', req.error);
      reject(req.error);
    };
  });
}

export function insertData(idb: IDBDatabase, table: TypingSchoolTables, row: object | object[]) {
  return new Promise((resolve, reject) => {
    const store = getObjectStore(idb, table, 'readwrite');
    const req = store.add(row);
    req.onsuccess = () => {
      resolve(req.result);
    };
    req.onerror = () => {
      console.log('IDBQueries.insertData error', req.error);
      reject(req.error);
    };
  });
}

export function getRowById(
  idb: IDBDatabase,  appSettings: IAppSettings = appSettingsInitialState, rowId: number
): Promise<IAnalyticsResult> {
  return new Promise((resolve, reject) => {
    const store = idb.transaction('analytics', 'readonly').objectStore('analytics');
    const req = store.get(rowId);
    req.onsuccess = () => {
      resolve(req.result);
    };
    req.onerror = () => {
      console.log('IDBQueries.getRowById error', req.error);
      reject(req.error);
    };
  });
}
