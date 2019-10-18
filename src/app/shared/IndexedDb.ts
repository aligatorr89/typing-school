
// const idb = window.indexedDB || window.mozIndexedDB ||
 // window.webkitIndexedDB || window.msIndexedDB;
// const idbTransaction = window.IDBTransaction || window.webkitIDBTransaction
// || window.msIDBTransaction || {READ_WRITE: "readwrite"};
// This line should only be needed if it is needed to support the object's constants for older browsers
// const idbKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

export const noSupportForindexedDBMessage =
  'Your browser doesn\'t support a stable version of IndexedDB. Some feature will not be available.';
export type TypingSchoolDatabases = 'typing_school';
export type TypingSchoolTables = 'analytics' | 'words';

export default class IDB {
  public static db: IDBDatabase;
  public static idbKeyRange: IDBKeyRange;
  public static idbTransaction: IDBTransaction;

  public static get instance(): Promise<IDBDatabase> {
    if (this.db) {
      return new Promise<IDBDatabase>((resolve, reject) => {
        resolve(this.db);
      });
    } else {
      this.idbFactory = window.indexedDB;
      return getDbConnection(this.idbFactory)
      .then((db) => this.db = db)
      .catch((error) => error);
    }
  }

  public static getObjectStore(table: TypingSchoolTables, mode: IDBTransactionMode) {
    return this.db.transaction(table, mode).objectStore(table);
  }

  public static insertData(table: TypingSchoolTables, row: any) {
    const store = this.getObjectStore(table, 'readwrite');
    const req = store.add(row);
    // req.onsuccess = (evt) => {};
    // req.onerror = () => {};
  }

  public static getData(table: TypingSchoolTables) {
    const store = this.getObjectStore(table, 'readonly');
    const req = store.getAll();

    return new Promise((resolve, reject) => {
      req.onsuccess = (evt) => {
        resolve(req.result);
      };
      req.onerror = () => {
        reject(req.error);
      };
    });
  }

  private static idbFactory: IDBFactory;
}

function getDbConnection(idb: IDBFactory): Promise<IDBDatabase> {
  if (!idb) {
    console.error(noSupportForindexedDBMessage);
    return new Promise((resolve, reject) => reject(noSupportForindexedDBMessage));
  }
  const request = idb.open('typing_school', 9);

  return new Promise((resolve, reject) => {
    request.onerror = (event) => {
      console.error('indexedDB error', event);
      reject(event);
    };

    request.onsuccess = (event) => {
      console.log('starting indexedDB on version:', request.result.version);
      const db = request.result;
      resolve(db);
    };

    request.onblocked = (event) => {
      console.log('blocking opening indexedDB...', request.result);
      reject(request.error);
    };

    request.onupgradeneeded = (event) => {
      console.log('onupgradeneeded event...', 'oldVersion', event.oldVersion);
      console.log('onupgradeneeded event...', 'newVersion', event.newVersion);
      const db = request.result;
      let store: IDBObjectStore;
      try {
        store = request.transaction.objectStore('analytics');
      } catch (e) {
        store = db.createObjectStore('analytics', {keyPath: 'id', autoIncrement: true});
      }

      if (store.indexNames.contains('wpm')) {
        store.createIndex('wpm', 'wpm', { unique: false });
      }

      if (store.indexNames.contains('words')) {
        store.createIndex('words', 'words', { unique: false });
      }

      if (store.indexNames.contains('timeNeeded')) {
        store.createIndex('timeNeeded', 'timeNeeded', { unique: false });
      }

      if (store.indexNames.contains('failedWords')) {
        store.createIndex('failedWords', 'failedWords', { unique: false });
      }

      if (store.indexNames.contains('language')) {
        store.createIndex('language', 'language', { unique: false });
      }

      if (store.indexNames.contains('mode')) {
        store.createIndex('mode', 'mode', { unique: false });
      }

      if (store.indexNames.contains('excerciseType')) {
        store.createIndex('excerciseType', 'excerciseType', { unique: false });
      }

      db.onversionchange = () => {
        resolve(db);
      };

      db.onabort = () => {
        reject(event);
      };

      db.onerror = () => {
        reject(event);
      };

      db.onclose = () => {
        resolve(db);
      };
    };
  });
}
