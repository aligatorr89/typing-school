const databases = [
  'typing_school'
];
const tables = [
  'words_typed',
  'analytics'
];
/*window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;*/
if (!window.indexedDB) {
  console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
}

const idb = window.indexedDB;

export default class IDB {
  constructor() {
    this.db;
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
        resolve(evt.target.result);
      };
      req.onerror = function() {
        reject(this.error);
      };
    });
  }
}

function getDbConnection() {
  var request = idb.open('typing_school');

  return new Promise((resolve, reject) => {
    request.onerror = function(event) {
      reject();
    };

    request.onsuccess = function(event) {
      const db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = function(event) {
      const db = event.currentTarget.result;
      const store = db.createObjectStore(
        'analytics', {keyPath: 'id', autoIncrement: true});

      store.createIndex('words_count', 'words_count', { unique: false });
      store.createIndex('timeNeeded', 'timeNeeded', { unique: false });
      store.createIndex('mistakes', 'mistakes', { unique: false });
      store.createIndex('wpm', 'wpm', { unique: false });
      store.createIndex('failedWords', 'failedWords', { unique: false });

      resolve(db);
    };
  })
};