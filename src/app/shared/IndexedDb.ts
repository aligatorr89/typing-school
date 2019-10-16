
// const idb = window.indexedDB || window.mozIndexedDB ||
 // window.webkitIndexedDB || window.msIndexedDB;
// const idbTransaction = window.IDBTransaction || window.webkitIDBTransaction
// || window.msIDBTransaction || {READ_WRITE: "readwrite"};
// This line should only be needed if it is needed to support the object's constants for older browsers
// const idbKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

export type TypingSchoolDatabases = 'typing_school';
export type TypingSchoolTables = 'analytics' | 'words';

export default class IDB {
  public db: IDBDatabase;
  public idbKeyRange: IDBKeyRange;
  public idbTransaction: IDBTransaction;
  private idbFactory: IDBFactory;
  constructor() {
    this.idbFactory = window.indexedDB;
    if (!this.idbFactory) {
      console.error('Your browser doesn\'t support a stable version of IndexedDB. Some feature will not be available.');
    }
    getDbConnection(this.idbFactory)
    .then((db) => this.db = db)
    .catch((error) => error);
  }
  public getObjectStore(table: TypingSchoolTables, mode: IDBTransactionMode) {
    return this.db.transaction(table, mode).objectStore(table);
  }

  public insertData(table: TypingSchoolTables, row: any) {
    const store = this.getObjectStore(table, 'readwrite');
    const req = store.add(row);
    // req.onsuccess = (evt) => {};
    // req.onerror = () => {};
  }

  public getData(table: TypingSchoolTables) {
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
}

function getDbConnection(idb: IDBFactory): Promise<IDBDatabase> {
  const request = idb.open('typing_school', 5);

  return new Promise((resolve, reject) => {
    request.onerror = (event) => {
      console.error('indexedDB error', request.error);
      reject(request.error);
    };

    request.onsuccess = (event) => {
      console.log('starting indexedDB on version:', request.result.version);
      const db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      console.log('onupgradeneeded event...', 'oldVersion', event.oldVersion);
      console.log('onupgradeneeded event...', 'newVersion', event.newVersion);
      const db = request.result;
      let store;
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

      resolve(db);
    };
  });
}
