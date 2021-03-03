/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "C:\\Users\\roksp\\Desktop\\sandbox\\typing-school\\public";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/web-workers/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/shared/AnalyticsResult.ts":
/*!*******************************************!*\
  !*** ./src/app/shared/AnalyticsResult.ts ***!
  \*******************************************/
/*! exports provided: analyticsResultsKeys, AnalyticsResult, AnalyticsResultHelp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"analyticsResultsKeys\", function() { return analyticsResultsKeys; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AnalyticsResult\", function() { return AnalyticsResult; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AnalyticsResultHelp\", function() { return AnalyticsResultHelp; });\nconst analyticsResultsKeys = ['id', 'textId', 'words', 'timeNeeded', 'mistakes',\r\n    'correctWordCharacters', 'allWordCharacters', 'failedWords', 'wpm', 'wpm_standard'];\r\nclass AnalyticsResult {\r\n    constructor(appSettings) {\r\n        this.textId = 0;\r\n        this.words = 0;\r\n        this.timeNeeded = 0;\r\n        this.mistakes = 0;\r\n        this.failedWords = [];\r\n        this.correctWordCharacters = 0;\r\n        this.allWordCharacters = 0;\r\n        this.wpm = 0;\r\n        this.wpm_standard = 0;\r\n        this.mode = appSettings.mode;\r\n        this.language = appSettings.language;\r\n        this.excerciseType = appSettings.excerciseType;\r\n        this.datetime = new Date().toISOString();\r\n    }\r\n}\r\nclass AnalyticsResultHelp {\r\n    static analyze(data, appSettings) {\r\n        const result = new AnalyticsResult(appSettings);\r\n        result.textId = data.length ? data[0].textId : 0;\r\n        for (let i = 0; i < data.length; i++) {\r\n            const current = data[i];\r\n            result.words += 1;\r\n            result.timeNeeded += current.timeNeeded ? current.timeNeeded : 0;\r\n            if (current.word !== current.correctWord && current.word) {\r\n                result.failedWords.push({\r\n                    correct: current.correctWord,\r\n                    actual: current.word\r\n                });\r\n                result.mistakes += 1;\r\n            }\r\n            else {\r\n                result.correctWordCharacters += current.word.length + 1;\r\n            }\r\n            result.allWordCharacters += current.word.length + 1;\r\n        }\r\n        result.wpm = Math.round((result.words - result.mistakes) * (100 * 60000 / result.timeNeeded) / 100);\r\n        result.wpm_standard = Math.round(result.correctWordCharacters / 5\r\n            * (100 * 60000 / result.timeNeeded) / 100);\r\n        return result;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/shared/AnalyticsResult.ts?");

/***/ }),

/***/ "./src/app/shared/App.ts":
/*!*******************************!*\
  !*** ./src/app/shared/App.ts ***!
  \*******************************/
/*! exports provided: appSettingsInitialState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"appSettingsInitialState\", function() { return appSettingsInitialState; });\nconst appSettingsInitialState = {\r\n    language: 'en',\r\n    mode: '200',\r\n    excerciseType: '10fastfingers'\r\n};\r\n\n\n//# sourceURL=webpack:///./src/app/shared/App.ts?");

/***/ }),

/***/ "./src/app/shared/IndexedDb.ts":
/*!*************************************!*\
  !*** ./src/app/shared/IndexedDb.ts ***!
  \*************************************/
/*! exports provided: noSupportForindexedDBMessage, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"noSupportForindexedDBMessage\", function() { return noSupportForindexedDBMessage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return IDB; });\n// const idb = window.indexedDB || window.mozIndexedDB ||\r\n// window.webkitIndexedDB || window.msIndexedDB;\r\n// const idbTransaction = window.IDBTransaction || window.webkitIDBTransaction\r\n// || window.msIDBTransaction || {READ_WRITE: \"readwrite\"};\r\n// This line should only be needed if it is needed to support the object's constants for older browsers\r\n// const idbKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;\r\nconst noSupportForindexedDBMessage = 'Your browser doesn\\'t support a stable version of IndexedDB. Some feature will not be available.';\r\nclass IDB {\r\n    static get instance() {\r\n        if (IDB.db) {\r\n            return new Promise((resolve, reject) => {\r\n                resolve(IDB.db);\r\n            });\r\n        }\r\n        else {\r\n            IDB.idbFactory = indexedDB;\r\n            return getDbConnection(this.idbFactory)\r\n                .then((db) => IDB.db = db)\r\n                .catch((error) => error);\r\n        }\r\n    }\r\n    static getObjectStore(table, mode) {\r\n        return IDB.db.transaction(table, mode).objectStore(table);\r\n    }\r\n    static insertData(table, row) {\r\n        const store = IDB.getObjectStore(table, 'readwrite');\r\n        const req = store.add(row);\r\n        return new Promise((resolve, reject) => {\r\n            req.onsuccess = () => {\r\n                resolve(req.result);\r\n            };\r\n            req.onerror = () => {\r\n                console.log('IDB.insertData error', req.error);\r\n                reject(req.error);\r\n            };\r\n        });\r\n    }\r\n    static getData(table) {\r\n        const store = IDB.getObjectStore(table, 'readonly');\r\n        const req = store.getAll();\r\n        return new Promise((resolve, reject) => {\r\n            req.onsuccess = (evt) => {\r\n                resolve(req.result);\r\n            };\r\n            req.onerror = () => {\r\n                reject(req.error);\r\n            };\r\n        });\r\n    }\r\n}\r\nfunction getDbConnection(idb) {\r\n    if (!idb) {\r\n        console.error(noSupportForindexedDBMessage);\r\n        return new Promise((resolve, reject) => reject(noSupportForindexedDBMessage));\r\n    }\r\n    const request = idb.open('typing_school', 11);\r\n    return new Promise((resolve, reject) => {\r\n        request.onerror = (event) => {\r\n            console.error('indexedDB error', event);\r\n            reject(event);\r\n        };\r\n        request.onsuccess = (event) => {\r\n            console.log('starting indexedDB on version:', request.result.version);\r\n            const db = request.result;\r\n            resolve(db);\r\n        };\r\n        request.onblocked = (event) => {\r\n            console.log('blocking opening indexedDB...', request.result);\r\n            reject(request.error);\r\n        };\r\n        request.onupgradeneeded = (event) => {\r\n            console.log('onupgradeneeded event...', 'oldVersion', event.oldVersion);\r\n            console.log('onupgradeneeded event...', 'newVersion', event.newVersion);\r\n            const db = request.result;\r\n            let store;\r\n            try {\r\n                store = request.transaction.objectStore('analytics');\r\n            }\r\n            catch (e) {\r\n                store = db.createObjectStore('analytics', { keyPath: 'id', autoIncrement: true });\r\n            }\r\n            if (store.indexNames.contains('wpm')) {\r\n                store.createIndex('wpm', 'wpm', { unique: false });\r\n            }\r\n            if (store.indexNames.contains('words')) {\r\n                store.createIndex('words', 'words', { unique: false });\r\n            }\r\n            if (store.indexNames.contains('timeNeeded')) {\r\n                store.createIndex('timeNeeded', 'timeNeeded', { unique: false });\r\n            }\r\n            if (store.indexNames.contains('failedWords')) {\r\n                store.createIndex('failedWords', 'failedWords', { unique: false });\r\n            }\r\n            if (store.indexNames.contains('language')) {\r\n                store.createIndex('language', 'language', { unique: false });\r\n            }\r\n            if (store.indexNames.contains('mode')) {\r\n                store.createIndex('mode', 'mode', { unique: false });\r\n            }\r\n            if (store.indexNames.contains('excerciseType')) {\r\n                store.createIndex('excerciseType', 'excerciseType', { unique: false });\r\n            }\r\n            try {\r\n                store = request.transaction.objectStore('words');\r\n            }\r\n            catch (e) {\r\n                store = db.createObjectStore('words', { keyPath: 'id', autoIncrement: true });\r\n            }\r\n            if (store.indexNames.contains('word')) {\r\n                store.createIndex('word', 'word', { unique: false });\r\n            }\r\n            if (store.indexNames.contains('correctWord')) {\r\n                store.createIndex('correctWord', 'correctWord', { unique: false });\r\n            }\r\n            if (store.indexNames.contains('timeNeeded')) {\r\n                store.createIndex('timeNeeded', 'timeNeeded', { unique: false });\r\n            }\r\n            db.onversionchange = () => {\r\n                resolve(db);\r\n            };\r\n            db.onabort = () => {\r\n                reject(event);\r\n            };\r\n            db.onerror = () => {\r\n                reject(event);\r\n            };\r\n            db.onclose = () => {\r\n                resolve(db);\r\n            };\r\n        };\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/shared/IndexedDb.ts?");

/***/ }),

/***/ "./src/app/shared/TypingSchoolIndexedDbQueries.ts":
/*!********************************************************!*\
  !*** ./src/app/shared/TypingSchoolIndexedDbQueries.ts ***!
  \********************************************************/
/*! exports provided: getLast100Results, getAllData, insertData, getRowById */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLast100Results\", function() { return getLast100Results; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAllData\", function() { return getAllData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"insertData\", function() { return insertData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getRowById\", function() { return getRowById; });\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ \"./src/app/shared/App.ts\");\n\r\nfunction getObjectStore(idb, table, mode = 'readonly') {\r\n    return idb.transaction('analytics', mode).objectStore(table);\r\n}\r\nfunction getLast100Results(idb, appSettings = _App__WEBPACK_IMPORTED_MODULE_0__[\"appSettingsInitialState\"]) {\r\n    return new Promise((resolve, reject) => {\r\n        const store = idb.transaction('analytics', 'readonly').objectStore('analytics');\r\n        const req = store.openCursor(null, 'prev');\r\n        const result = [];\r\n        let count = 0;\r\n        req.onsuccess = () => {\r\n            const cursor = req.result;\r\n            if (cursor && count < 100) {\r\n                const o = cursor.value;\r\n                if (o.language === appSettings.language && o.mode === appSettings.mode && o.words > 3) {\r\n                    result.push(cursor.value);\r\n                    count++;\r\n                }\r\n                cursor.continue();\r\n            }\r\n            else {\r\n                resolve(result);\r\n            }\r\n        };\r\n        req.onerror = () => {\r\n            console.log('IDBQueries.getLast100Results error', req.error);\r\n            reject(req.error);\r\n        };\r\n    });\r\n}\r\nfunction getAllData(idb) {\r\n    return new Promise((resolve, reject) => {\r\n        const store = idb.transaction('analytics', 'readonly').objectStore('analytics');\r\n        const req = store.getAll();\r\n        req.onsuccess = () => {\r\n            resolve(req.result);\r\n        };\r\n        req.onerror = () => {\r\n            console.log('IDBQueries.getAllData error', req.error);\r\n            reject(req.error);\r\n        };\r\n    });\r\n}\r\nfunction insertData(idb, table, row) {\r\n    return new Promise((resolve, reject) => {\r\n        const store = getObjectStore(idb, table, 'readwrite');\r\n        const req = store.add(row);\r\n        req.onsuccess = () => {\r\n            resolve(req.result);\r\n        };\r\n        req.onerror = () => {\r\n            console.log('IDBQueries.insertData error', req.error);\r\n            reject(req.error);\r\n        };\r\n    });\r\n}\r\nfunction getRowById(idb, appSettings = _App__WEBPACK_IMPORTED_MODULE_0__[\"appSettingsInitialState\"], rowId) {\r\n    return new Promise((resolve, reject) => {\r\n        const store = idb.transaction('analytics', 'readonly').objectStore('analytics');\r\n        const req = store.get(rowId);\r\n        req.onsuccess = () => {\r\n            resolve(req.result);\r\n        };\r\n        req.onerror = () => {\r\n            console.log('IDBQueries.getRowById error', req.error);\r\n            reject(req.error);\r\n        };\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/shared/TypingSchoolIndexedDbQueries.ts?");

/***/ }),

/***/ "./src/web-workers/index.ts":
/*!**********************************!*\
  !*** ./src/web-workers/index.ts ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_shared_AnalyticsResult__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app/shared/AnalyticsResult */ \"./src/app/shared/AnalyticsResult.ts\");\n/* harmony import */ var _app_shared_IndexedDb__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../app/shared/IndexedDb */ \"./src/app/shared/IndexedDb.ts\");\n/* harmony import */ var _app_shared_TypingSchoolIndexedDbQueries__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../app/shared/TypingSchoolIndexedDbQueries */ \"./src/app/shared/TypingSchoolIndexedDbQueries.ts\");\n\r\n\r\n\r\nconst worker = self;\r\nworker.onmessage = (event) => {\r\n    const eventData = event.data;\r\n    _app_shared_IndexedDb__WEBPACK_IMPORTED_MODULE_1__[\"default\"].instance.then(() => {\r\n        switch (eventData.name) {\r\n            case 'analytics':\r\n                event.stopPropagation();\r\n                const result = _app_shared_AnalyticsResult__WEBPACK_IMPORTED_MODULE_0__[\"AnalyticsResultHelp\"].analyze(eventData.data, eventData.appSettings);\r\n                return _app_shared_IndexedDb__WEBPACK_IMPORTED_MODULE_1__[\"default\"].insertData('analytics', result).then((res) => {\r\n                    result.id = res;\r\n                    return worker.postMessage(Object.assign(Object.assign({}, eventData), { data: result }));\r\n                });\r\n            case 'words':\r\n                event.stopPropagation();\r\n                _app_shared_IndexedDb__WEBPACK_IMPORTED_MODULE_1__[\"default\"].insertData('words', Object.assign(Object.assign({}, eventData.data), eventData.appSettings));\r\n                return worker.postMessage(eventData);\r\n            case 'getLast100Rows':\r\n                event.stopPropagation();\r\n                return _app_shared_TypingSchoolIndexedDbQueries__WEBPACK_IMPORTED_MODULE_2__[\"getLast100Results\"](_app_shared_IndexedDb__WEBPACK_IMPORTED_MODULE_1__[\"default\"].db, eventData.appSettings)\r\n                    .then((res) => worker.postMessage(Object.assign(Object.assign({}, eventData), { data: res })));\r\n            case 'getRowById':\r\n                event.stopPropagation();\r\n                return _app_shared_TypingSchoolIndexedDbQueries__WEBPACK_IMPORTED_MODULE_2__[\"getRowById\"](_app_shared_IndexedDb__WEBPACK_IMPORTED_MODULE_1__[\"default\"].db, eventData.appSettings, eventData.data.id)\r\n                    .then((res) => worker.postMessage(Object.assign(Object.assign({}, eventData), { data: res })));\r\n            case 'getAllRows':\r\n                event.stopPropagation();\r\n                return _app_shared_TypingSchoolIndexedDbQueries__WEBPACK_IMPORTED_MODULE_2__[\"getAllData\"](_app_shared_IndexedDb__WEBPACK_IMPORTED_MODULE_1__[\"default\"].db)\r\n                    .then((res) => worker.postMessage(Object.assign(Object.assign({}, eventData), { data: res })));\r\n            case 'test':\r\n                setTimeout(() => {\r\n                    worker.postMessage(Object.assign({}, eventData));\r\n                }, 10000);\r\n            default: return;\r\n        }\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack:///./src/web-workers/index.ts?");

/***/ })

/******/ });