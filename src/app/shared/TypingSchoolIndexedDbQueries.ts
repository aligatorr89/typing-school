import { IAnalyticsResult } from './AnalyticsResult';

export function getLast100Results(idb: IDBDatabase): Promise<IAnalyticsResult[]> {
  return new Promise((resolve, reject) => {
    const store = idb.transaction('analytics', 'readonly').objectStore('analytics');

    const req = store.openCursor(null, 'prev');
    const result = [];
    let count = 0;
    req.onsuccess = () => {
      const cursor = req.result;
      if (cursor && count < 100) {
        if (cursor.value.words > 3) {
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
