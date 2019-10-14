const databases = [
  'typing_school'
];
const tables = [
  'words_typed',
  'analytics'
];

const idb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
const idbTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
const idbKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
if (!idb) {
  console.log("Your browser doesn't support a stable version of IndexedDB. Some feature will not be available.");
}

export default class IDB {
  constructor() {
    this.db;
    this.idbKeyRange = idbKeyRange;
    this.idbTransaction = idbTransaction;
    getDbConnection()
    .then(db => this.db = db);
  }
  getObjectStore(table, mode) {
    var tx = this.db.transaction(table, mode);
    return tx.objectStore(table);
  }
  insertData(table, row) {
    const store = this.getObjectStore(table, 'readwrite');
    const req = store.add(row);
    req.onsuccess = function (evt) {
    };
    req.onerror = function() {
      // console.error("add to db error", this.error);
    };
  }
  getData(table, query) {
    const store = this.getObjectStore(table, 'readonly');
    const req = store.getAll();

    return new Promise((resolve, reject) => {
      req.onsuccess = function (evt) {
        resolve(req.result);
      };
      req.onerror = function() {
        reject(req.error);
      };
    });
  }
}

function getDbConnection() {
  var request = idb.open('typing_school', 5);

  return new Promise((resolve, reject) => {
    request.onerror = function(event) {
      console.log('indexedDB error', request.error);
      reject('indexedDB error', request.error);
    };

    request.onsuccess = function(event) {
      console.log('starting indexedDB on version:', event.target.result.version);
      const db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = function(event) {
      console.log('onupgradeneeded event...', 'oldVersion', event.oldVersion);
      console.log('onupgradeneeded event...', 'newVersion', event.newVersion);
      const db = request.result;
      let store;
      try {
        store = request.transaction.objectStore('analytics');
      }
      catch(e) {
        store = db.createObjectStore('analytics', {keyPath: 'id', autoIncrement: true});
      }

      if(store.indexNames.contains('wpm')) {
        store.createIndex('wpm', 'wpm', { unique: false });
      }

      if(store.indexNames.contains('words')) {
        store.createIndex('words', 'words', { unique: false });
      }

      if(store.indexNames.contains('timeNeeded')) {
        store.createIndex('timeNeeded', 'timeNeeded', { unique: false });
      }

      if(store.indexNames.contains('failedWords')) {
        store.createIndex('failedWords', 'failedWords', { unique: false });
      }

      resolve(db);
    };
  });
};
