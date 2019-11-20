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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/app.ts":
/*!************************!*\
  !*** ./src/app/app.ts ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shared_Api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/Api */ \"./src/app/shared/Api.ts\");\n/* harmony import */ var _shared_App__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/App */ \"./src/app/shared/App.ts\");\n\r\n\r\nclass App {\r\n    constructor(settings = _shared_App__WEBPACK_IMPORTED_MODULE_1__[\"appSettingsInitialState\"]) {\r\n        this.settings = Object.assign(Object.assign({}, _shared_App__WEBPACK_IMPORTED_MODULE_1__[\"appSettingsInitialState\"]), settings);\r\n        this.node = document.getElementById('app');\r\n        this.textData = [];\r\n        this.setLanguage = this.setLanguage.bind(this);\r\n        this.setMode = this.setMode.bind(this);\r\n    }\r\n    get currentSettings() {\r\n        return this.settings;\r\n    }\r\n    setMode(mode) {\r\n        this.settings.mode = mode;\r\n        this.getData(this.settings)\r\n            .then((res) => this.node.dispatchEvent(new Event('setMode')));\r\n    }\r\n    get currentLanguage() {\r\n        return this.settings.language;\r\n    }\r\n    setLanguage(language) {\r\n        this.settings.language = language;\r\n        this.getData(this.settings)\r\n            .then((res) => this.node.dispatchEvent(new Event('setLanguage')));\r\n    }\r\n    newTextChunk() {\r\n        this.currentChunkIndex = Math.round(Math.random() * 1000);\r\n        this.currentTextChunk = this.textData[this.currentChunkIndex].split('|');\r\n        return this.currentTextChunk;\r\n    }\r\n    setTextChunk(textId) {\r\n        this.currentChunkIndex = textId - 1;\r\n        this.currentTextChunk = this.textData[this.currentChunkIndex].split('|');\r\n        return this.currentTextChunk;\r\n    }\r\n    get textChunk() {\r\n        return this.currentTextChunk ? this.currentTextChunk : [];\r\n    }\r\n    get textChunkId() {\r\n        return this.currentChunkIndex + 1;\r\n    }\r\n    getData(settings = this.settings) {\r\n        return Object(_shared_Api__WEBPACK_IMPORTED_MODULE_0__[\"getTypingTests\"])(settings.language, settings.mode)\r\n            .then((data) => {\r\n            this.textData = data.split('\\n');\r\n            return data;\r\n        })\r\n            .catch((error) => error);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\r\n\n\n//# sourceURL=webpack:///./src/app/app.ts?");

/***/ }),

/***/ "./src/app/index.ts":
/*!**************************!*\
  !*** ./src/app/index.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/app/app.ts\");\n/* harmony import */ var _shared_Analytics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/Analytics */ \"./src/app/shared/Analytics.ts\");\n/* harmony import */ var _shared_TypingTest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/TypingTest */ \"./src/app/shared/TypingTest.ts\");\n/* harmony import */ var _shared_serviceWorker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/serviceWorker */ \"./src/app/shared/serviceWorker.ts\");\n/* harmony import */ var _shared_WebWorker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/WebWorker */ \"./src/app/shared/WebWorker.ts\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view */ \"./src/app/view.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n(() => {\r\n    _shared_serviceWorker__WEBPACK_IMPORTED_MODULE_3__[\"default\"].setServiceWorker();\r\n    const app = new _app__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    const typingTest = new _shared_TypingTest__WEBPACK_IMPORTED_MODULE_2__[\"TypingTest\"]();\r\n    _shared_WebWorker__WEBPACK_IMPORTED_MODULE_4__[\"worker\"].postMessage(Object(_shared_WebWorker__WEBPACK_IMPORTED_MODULE_4__[\"postMessageData\"])('getLast100Rows', null, app.currentSettings));\r\n    Object(_shared_WebWorker__WEBPACK_IMPORTED_MODULE_4__[\"postMessageResponse\"])()\r\n        .then((res) => resultsView.setTable(res.data))\r\n        .catch((error) => console.log(error));\r\n    app.getData()\r\n        .then(() => {\r\n        typingTest.setNew(app.newTextChunk());\r\n        textView.set(app.textChunk);\r\n    })\r\n        .catch((error) => console.log(error));\r\n    const analytics = new _shared_Analytics__WEBPACK_IMPORTED_MODULE_1__[\"Analytics\"]();\r\n    const textView = new _view__WEBPACK_IMPORTED_MODULE_5__[\"Text\"]();\r\n    const userInputView = new _view__WEBPACK_IMPORTED_MODULE_5__[\"UserInput\"](keyDownEventHandler, keyUpEventHandler);\r\n    const refreshButtonView = new _view__WEBPACK_IMPORTED_MODULE_5__[\"RefreshButton\"]();\r\n    const timerView = new _view__WEBPACK_IMPORTED_MODULE_5__[\"Timer\"]();\r\n    const resultsView = new _view__WEBPACK_IMPORTED_MODULE_5__[\"Results\"]();\r\n    const downloadButtonView = new _view__WEBPACK_IMPORTED_MODULE_5__[\"DownLoadResultsButton\"]();\r\n    const languageSelectView = new _view__WEBPACK_IMPORTED_MODULE_5__[\"LanguageSelect\"](app.setLanguage);\r\n    const modeSelectView = new _view__WEBPACK_IMPORTED_MODULE_5__[\"ModeSelect\"](app.setMode);\r\n    userInputView.node.focus();\r\n    userInputView.node.addEventListener('keydown', keyDownEventHandler);\r\n    userInputView.node.addEventListener('keyup', keyUpEventHandler);\r\n    refreshButtonView.node.addEventListener('click', endTestEventHandler);\r\n    app.node.addEventListener('setLanguage', changeSettings);\r\n    app.node.addEventListener('setMode', changeSettings);\r\n    function changeSettings() {\r\n        _shared_WebWorker__WEBPACK_IMPORTED_MODULE_4__[\"worker\"].postMessage(Object(_shared_WebWorker__WEBPACK_IMPORTED_MODULE_4__[\"postMessageData\"])('getLast100Rows', null, app.currentSettings));\r\n        Object(_shared_WebWorker__WEBPACK_IMPORTED_MODULE_4__[\"postMessageResponse\"])()\r\n            .then((res) => {\r\n            endTestEventHandler();\r\n            resultsView.replaceTable(res.data);\r\n        })\r\n            .catch((error) => console.log(error));\r\n    }\r\n    function keyDownEventHandler(event) {\r\n        if (event.keyCode !== 27) {\r\n            typingTest.start();\r\n            userInputView.node.removeEventListener('keydown', keyDownEventHandler);\r\n            timerView.set();\r\n        }\r\n    }\r\n    function keyUpEventHandler(event) {\r\n        if (event.keyCode === 32) {\r\n            const writtenWord = userInputView.node.value;\r\n            const nowDate = Date.now();\r\n            // spaceKeyupDisableCorrection(event);\r\n            textView.nextWordHighlight();\r\n            userInputView.node.value = '';\r\n            analytics.insert(writtenWord, typingTest.currentWord, nowDate - typingTest.currentWordTime, app.currentSettings, app.textChunkId);\r\n            typingTest.nextWord(nowDate);\r\n        }\r\n        else if (event.keyCode === 27) {\r\n            endTestEventHandler();\r\n        }\r\n    }\r\n    function spaceKeyupDisableCorrection() {\r\n        textView.nextWordHighlight();\r\n        userInputView.node.value = '';\r\n    }\r\n    function endTestEventHandler() {\r\n        analytics.analyzePrevious(app.currentSettings)\r\n            .then((res) => resultsView.prependToTable(res));\r\n        timerView.unset();\r\n        typingTest.setNew(app.newTextChunk());\r\n        textView.set(app.textChunk);\r\n        userInputView.node.value = '';\r\n        userInputView.node.addEventListener('keydown', keyDownEventHandler);\r\n    }\r\n})();\r\n\n\n//# sourceURL=webpack:///./src/app/index.ts?");

/***/ }),

/***/ "./src/app/shared/Analytics.ts":
/*!*************************************!*\
  !*** ./src/app/shared/Analytics.ts ***!
  \*************************************/
/*! exports provided: Analytics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Analytics\", function() { return Analytics; });\n/* harmony import */ var _WebWorker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WebWorker */ \"./src/app/shared/WebWorker.ts\");\n\r\nclass Analytics {\r\n    constructor() {\r\n        this.data = [];\r\n        this.prevChunkStart = 0;\r\n        this.prevChunkEnd = 0;\r\n    }\r\n    insert(word, correctWord, timeNeeded, appSettings, textId) {\r\n        this.currentTextId = textId;\r\n        word = word.replace(' ', '');\r\n        const data = { word, correctWord, timeNeeded, textId };\r\n        this.data.push(data);\r\n        _WebWorker__WEBPACK_IMPORTED_MODULE_0__[\"worker\"].postMessage(Object(_WebWorker__WEBPACK_IMPORTED_MODULE_0__[\"postMessageData\"])('words', data, appSettings));\r\n        Object(_WebWorker__WEBPACK_IMPORTED_MODULE_0__[\"postMessageResponse\"])();\r\n    }\r\n    analyzePrevious(appSettings) {\r\n        this.prevChunkEnd = this.data.length;\r\n        const previous = this.data.slice(this.prevChunkStart, this.prevChunkEnd);\r\n        this.prevChunkStart = this.prevChunkEnd;\r\n        return this.analyze(previous, appSettings);\r\n    }\r\n    analyzeAll(appSettings) {\r\n        return this.analyze(this.data, appSettings);\r\n    }\r\n    analyze(dataChunk, appSettings) {\r\n        _WebWorker__WEBPACK_IMPORTED_MODULE_0__[\"worker\"].postMessage(Object(_WebWorker__WEBPACK_IMPORTED_MODULE_0__[\"postMessageData\"])('analytics', dataChunk, appSettings));\r\n        return Object(_WebWorker__WEBPACK_IMPORTED_MODULE_0__[\"postMessageResponse\"])()\r\n            .then((res) => res.data);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/shared/Analytics.ts?");

/***/ }),

/***/ "./src/app/shared/AnalyticsResult.ts":
/*!*******************************************!*\
  !*** ./src/app/shared/AnalyticsResult.ts ***!
  \*******************************************/
/*! exports provided: analyticsResultsKeys, AnalyticsResult, AnalyticsResultHelp */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"analyticsResultsKeys\", function() { return analyticsResultsKeys; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AnalyticsResult\", function() { return AnalyticsResult; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AnalyticsResultHelp\", function() { return AnalyticsResultHelp; });\nconst analyticsResultsKeys = ['id', 'words', 'timeNeeded', 'mistakes',\r\n    'correctWordCharacters', 'allWordCharacters', 'failedWords', 'wpm', 'wpm_standard'];\r\nclass AnalyticsResult {\r\n    constructor(appSettings) {\r\n        this.textId = 0;\r\n        this.words = 0;\r\n        this.timeNeeded = 0;\r\n        this.mistakes = 0;\r\n        this.failedWords = [];\r\n        this.correctWordCharacters = 0;\r\n        this.allWordCharacters = 0;\r\n        this.wpm = 0;\r\n        this.wpm_standard = 0;\r\n        this.mode = appSettings.mode;\r\n        this.language = appSettings.language;\r\n        this.excerciseType = appSettings.excerciseType;\r\n    }\r\n}\r\nclass AnalyticsResultHelp {\r\n    static analyze(data, appSettings) {\r\n        const result = new AnalyticsResult(appSettings);\r\n        result.textId = data.length ? data[0].textId : 0;\r\n        for (let i = 0; i < data.length; i++) {\r\n            const current = data[i];\r\n            result.words += 1;\r\n            result.timeNeeded += current.timeNeeded ? current.timeNeeded : 0;\r\n            if (current.word !== current.correctWord && current.word) {\r\n                result.failedWords.push({\r\n                    correct: current.correctWord,\r\n                    actual: current.word\r\n                });\r\n                result.mistakes += 1;\r\n            }\r\n            else {\r\n                result.correctWordCharacters += current.word.length + 1;\r\n            }\r\n            result.allWordCharacters += current.word.length + 1;\r\n        }\r\n        result.wpm = Math.round((result.words - result.mistakes) * (100 * 60000 / result.timeNeeded) / 100);\r\n        result.wpm_standard = Math.round(result.correctWordCharacters / 5\r\n            * (100 * 60000 / result.timeNeeded) / 100);\r\n        return result;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/shared/AnalyticsResult.ts?");

/***/ }),

/***/ "./src/app/shared/Api.ts":
/*!*******************************!*\
  !*** ./src/app/shared/Api.ts ***!
  \*******************************/
/*! exports provided: typingTestUrl, getTypingTests */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"typingTestUrl\", function() { return typingTestUrl; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getTypingTests\", function() { return getTypingTests; });\nconst typingTestUrl = 'http://localhost:8090/api';\r\nfunction getTypingTests(language = 'en', mode = '') {\r\n    const url = new URL(typingTestUrl);\r\n    url.searchParams.set('language', language);\r\n    url.searchParams.set('mode', mode);\r\n    return new Promise((resolve, reject) => {\r\n        const request = new XMLHttpRequest();\r\n        request.responseType = 'text';\r\n        request.open('GET', url.toString(), true);\r\n        request.send();\r\n        request.onreadystatechange = () => {\r\n            if (request.readyState === 4 && request.status === 200) {\r\n                resolve(request.responseText);\r\n            }\r\n        };\r\n        request.onerror = () => {\r\n            reject(request.statusText);\r\n        };\r\n        request.onabort = () => {\r\n            reject(request.statusText);\r\n        };\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/shared/Api.ts?");

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
/*! exports provided: getLast100Results, getAllData, insertData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLast100Results\", function() { return getLast100Results; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAllData\", function() { return getAllData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"insertData\", function() { return insertData; });\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ \"./src/app/shared/App.ts\");\n\r\nfunction getObjectStore(idb, table, mode = 'readonly') {\r\n    return idb.transaction('analytics', mode).objectStore(table);\r\n}\r\nfunction getLast100Results(idb, appSettings = _App__WEBPACK_IMPORTED_MODULE_0__[\"appSettingsInitialState\"]) {\r\n    return new Promise((resolve, reject) => {\r\n        const store = idb.transaction('analytics', 'readonly').objectStore('analytics');\r\n        const req = store.openCursor(null, 'prev');\r\n        const result = [];\r\n        let count = 0;\r\n        req.onsuccess = () => {\r\n            const cursor = req.result;\r\n            if (cursor && count < 100) {\r\n                const o = cursor.value;\r\n                if (o.language === appSettings.language && o.mode === appSettings.mode && o.words > 3) {\r\n                    result.push(cursor.value);\r\n                    count++;\r\n                }\r\n                cursor.continue();\r\n            }\r\n            else {\r\n                resolve(result);\r\n            }\r\n        };\r\n        req.onerror = () => {\r\n            console.log('IDBQueries.getLast100Results error', req.error);\r\n            reject(req.error);\r\n        };\r\n    });\r\n}\r\nfunction getAllData(idb) {\r\n    return new Promise((resolve, reject) => {\r\n        const store = idb.transaction('analytics', 'readonly').objectStore('analytics');\r\n        const req = store.getAll();\r\n        req.onsuccess = () => {\r\n            resolve(req.result);\r\n        };\r\n        req.onerror = () => {\r\n            console.log('IDBQueries.getAllData error', req.error);\r\n            reject(req.error);\r\n        };\r\n    });\r\n}\r\nfunction insertData(idb, table, row) {\r\n    return new Promise((resolve, reject) => {\r\n        const store = getObjectStore(idb, table, 'readwrite');\r\n        const req = store.add(row);\r\n        req.onsuccess = () => {\r\n            resolve(req.result);\r\n        };\r\n        req.onerror = () => {\r\n            console.log('IDBQueries.insertData error', req.error);\r\n            reject(req.error);\r\n        };\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/shared/TypingSchoolIndexedDbQueries.ts?");

/***/ }),

/***/ "./src/app/shared/TypingTest.ts":
/*!**************************************!*\
  !*** ./src/app/shared/TypingTest.ts ***!
  \**************************************/
/*! exports provided: languages, modes, TypingTest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"languages\", function() { return languages; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"modes\", function() { return modes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TypingTest\", function() { return TypingTest; });\nconst languages = ['en', 'si'];\r\nconst modes = ['200', '1000'];\r\nclass TypingTest {\r\n    constructor() {\r\n        this.wordCount = 0;\r\n    }\r\n    setNew(textChunk) {\r\n        this.wordCount = 0;\r\n        this.text = textChunk;\r\n    }\r\n    start() {\r\n        this.startTime = Date.now();\r\n        this.currentWordTimeStart = this.startTime;\r\n    }\r\n    pause() {\r\n        // console.log('pausing...');\r\n    }\r\n    get timePassed() {\r\n        return Date.now() - this.startTime;\r\n    }\r\n    get currentWord() {\r\n        return this.text[this.wordCount];\r\n    }\r\n    get currentWordCount() {\r\n        return this.wordCount;\r\n    }\r\n    get currentWordTime() {\r\n        return this.currentWordTimeStart;\r\n    }\r\n    nextWord(nowDate) {\r\n        // analytics.insert(typedWord, this.text[this.wordCount], newDate - this.currentWordTimeCounter);\r\n        this.currentWordTimeStart = nowDate;\r\n        this.wordCount++;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/shared/TypingTest.ts?");

/***/ }),

/***/ "./src/app/shared/ViewHelp.ts":
/*!************************************!*\
  !*** ./src/app/shared/ViewHelp.ts ***!
  \************************************/
/*! exports provided: appMarkBinded, findSelectElement, setSelectElementOptions, findButtonElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"appMarkBinded\", function() { return appMarkBinded; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"findSelectElement\", function() { return findSelectElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setSelectElementOptions\", function() { return setSelectElementOptions; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"findButtonElement\", function() { return findButtonElement; });\nconst appMarkBinded = 'ra-b';\r\nfunction findSelectElement(elementName) {\r\n    const element = document.querySelector('select[name=\"' + elementName + '\"]');\r\n    element.name += appMarkBinded;\r\n    return element;\r\n}\r\nfunction setSelectElementOptions(node, array) {\r\n    for (let i = 0; i < array.length; i++) {\r\n        const option = document.createElement('option');\r\n        option.value = array[i];\r\n        option.textContent = array[i];\r\n        node.appendChild(option);\r\n    }\r\n}\r\nfunction findButtonElement(elementName) {\r\n    const element = document.querySelector('button[name=\"' + elementName + '\"]');\r\n    element.name += appMarkBinded;\r\n    return element;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/shared/ViewHelp.ts?");

/***/ }),

/***/ "./src/app/shared/WebWorker.ts":
/*!*************************************!*\
  !*** ./src/app/shared/WebWorker.ts ***!
  \*************************************/
/*! exports provided: workerLocation, PostMessageCounter, postMessageData, postMessageResponse, worker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"workerLocation\", function() { return workerLocation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PostMessageCounter\", function() { return PostMessageCounter; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"postMessageData\", function() { return postMessageData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"postMessageResponse\", function() { return postMessageResponse; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"worker\", function() { return worker; });\nconst workerLocation = '/public/js/worker.js';\r\nclass PostMessageCounter {\r\n    static get count() {\r\n        return ++PostMessageCounter.counter;\r\n    }\r\n    static get value() {\r\n        return PostMessageCounter.counter;\r\n    }\r\n}\r\nPostMessageCounter.counter = 0;\r\nconst postMessageData = (name, data, appSettings) => {\r\n    return { id: PostMessageCounter.count, name, data, appSettings };\r\n};\r\nconst postMessageResponse = () => {\r\n    const id = PostMessageCounter.value;\r\n    return new Promise((resolve, reject) => {\r\n        worker.addEventListener('message', function response(event) {\r\n            if (event.data.id === id) {\r\n                resolve(event.data);\r\n                worker.removeEventListener('message', response);\r\n            }\r\n        });\r\n        worker.onerror = (error) => {\r\n            reject(error);\r\n        };\r\n    });\r\n};\r\nconst worker = new Worker(workerLocation);\r\n\n\n//# sourceURL=webpack:///./src/app/shared/WebWorker.ts?");

/***/ }),

/***/ "./src/app/shared/serviceWorker.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/serviceWorker.ts ***!
  \*****************************************/
/*! exports provided: serviceWorkerNotSupported, serviceWorkerServerFile, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"serviceWorkerNotSupported\", function() { return serviceWorkerNotSupported; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"serviceWorkerServerFile\", function() { return serviceWorkerServerFile; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SW; });\nconst serviceWorkerNotSupported = 'Your browser does not support serviceWorker!!!';\r\nconst serviceWorkerServerFile = 'sw.js';\r\nclass SW {\r\n    static setServiceWorker() {\r\n        if (!SW.sw) {\r\n            SW.sw = navigator.serviceWorker;\r\n            if (SW.sw) {\r\n                addEventListener('load', () => {\r\n                    SW.sw.register(serviceWorkerServerFile)\r\n                        .then(() => {\r\n                        console.log('ServiceWorker registered succesfully!');\r\n                    })\r\n                        .catch((error) => console.log('ServiceWorker register error:', error));\r\n                });\r\n            }\r\n            else {\r\n                console.log(serviceWorkerNotSupported);\r\n            }\r\n        }\r\n    }\r\n}\r\n// (() => {\r\n//   const serviceWorker = window.navigator.serviceWorker;\r\n//   if (serviceWorker) {\r\n//     serviceWorker.register('sw.js')\r\n//     .then((registration) => {\r\n//       console.log('serviceWorker registration success', registration);\r\n//       let sw;\r\n//       if (registration.installing) {\r\n//         sw = registration.installing;\r\n//         console.log('serviceWorker state: ', 'installing');\r\n//       } else if (registration.waiting) {\r\n//         sw = registration.installing;\r\n//         console.log('serviceWorker state: ', 'waiting');\r\n//       } else if (registration.active) {\r\n//         sw = registration.active;\r\n//         console.log('serviceWorker state: ', 'active');\r\n//       }\r\n//\r\n//       if (sw) {\r\n//         console.log('sw state: ', sw.state);\r\n//         sw.addEventListener('statechange', (e) => {\r\n//           console.log('statechange', e.target.state);\r\n//         });\r\n//       }\r\n//     })\r\n//     .catch((error) => {\r\n//       console.log('serviceWorker failed to register', error);\r\n//     });\r\n//     window.addEventListener('message', (message) => {\r\n//       console.log('message here serviceWorker:', message);\r\n//     }, false);\r\n//   } else {\r\n//     console.log('Your browser does not support serviceWorker!!!');\r\n//   }\r\n// })();\r\n\n\n//# sourceURL=webpack:///./src/app/shared/serviceWorker.ts?");

/***/ }),

/***/ "./src/app/view.ts":
/*!*************************!*\
  !*** ./src/app/view.ts ***!
  \*************************/
/*! exports provided: Text, UserInput, RefreshButton, Timer, Results, DownLoadResultsButton, LanguageSelect, ModeSelect, appMarkBinded */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserInput\", function() { return UserInput; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RefreshButton\", function() { return RefreshButton; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Timer\", function() { return Timer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Results\", function() { return Results; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DownLoadResultsButton\", function() { return DownLoadResultsButton; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LanguageSelect\", function() { return LanguageSelect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ModeSelect\", function() { return ModeSelect; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"appMarkBinded\", function() { return appMarkBinded; });\n/* harmony import */ var _shared_IndexedDb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/IndexedDb */ \"./src/app/shared/IndexedDb.ts\");\n/* harmony import */ var _shared_TypingSchoolIndexedDbQueries__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/TypingSchoolIndexedDbQueries */ \"./src/app/shared/TypingSchoolIndexedDbQueries.ts\");\n/* harmony import */ var _shared_TypingTest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/TypingTest */ \"./src/app/shared/TypingTest.ts\");\n/* harmony import */ var _shared_ViewHelp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/ViewHelp */ \"./src/app/shared/ViewHelp.ts\");\n/* harmony import */ var _view_analytics_results__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/analytics-results */ \"./src/app/view/analytics-results.ts\");\n/* harmony import */ var _view_text_chunk__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view/text-chunk */ \"./src/app/view/text-chunk.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass Text {\r\n    constructor() {\r\n        this.isSet = false;\r\n        this.currentIndex = 0;\r\n        this.node = document.getElementById('words');\r\n    }\r\n    set(textChunk) {\r\n        if (this.isSet) {\r\n            _view_text_chunk__WEBPACK_IMPORTED_MODULE_5__[\"setTextChunk\"](this.node, textChunk, this.currentIndex);\r\n        }\r\n        else {\r\n            _view_text_chunk__WEBPACK_IMPORTED_MODULE_5__[\"renderTextChunk\"](this.node, textChunk);\r\n            this.isSet = true;\r\n        }\r\n        this.currentIndex = 0;\r\n        this.node.children[0].classList.add('current');\r\n    }\r\n    nextWordHighlight() {\r\n        this.highlightCurrent();\r\n        this.highlightNext();\r\n        this.currentIndex++;\r\n    }\r\n    highlightCurrent() {\r\n        this.node.children[this.currentIndex].classList.replace('current', 'done');\r\n    }\r\n    highlightNext() {\r\n        if (this.node.children[this.currentIndex + 1]) {\r\n            this.node.children[this.currentIndex + 1].classList.add('current');\r\n        }\r\n    }\r\n}\r\nclass UserInput {\r\n    constructor(keyDownEventHandler, keyUpEventHandler) {\r\n        this.node = document.getElementById('typing');\r\n        this.keyDownEventHandler = keyDownEventHandler;\r\n        this.keyUpEventHandler = keyUpEventHandler;\r\n    }\r\n    setUp() {\r\n        this.node.focus();\r\n        this.addKeyDownListener();\r\n        this.addKeyUpListener();\r\n    }\r\n    tearDown() {\r\n        this.removeKeyDownListener();\r\n        this.node.value = '';\r\n        this.node.focus();\r\n    }\r\n    addKeyDownListener() {\r\n        this.node.addEventListener('keydown', this.keyDownEventHandler);\r\n    }\r\n    addKeyUpListener() {\r\n        this.node.addEventListener('keyup', this.keyUpEventHandler);\r\n    }\r\n    removeKeyUpListener() {\r\n        this.node.removeEventListener('keyup', this.keyUpEventHandler);\r\n    }\r\n    removeKeyDownListener() {\r\n        this.node.removeEventListener('keydown', this.keyDownEventHandler);\r\n    }\r\n}\r\nclass RefreshButton {\r\n    constructor() {\r\n        this.node = document.getElementById('refreshText');\r\n    }\r\n}\r\nclass Timer {\r\n    constructor() {\r\n        this.node = document.getElementById('timer');\r\n        this.node.textContent = '0';\r\n    }\r\n    set() {\r\n        let seconds = 0;\r\n        this.intervalId = setInterval(() => {\r\n            this.node.textContent = ++seconds + '';\r\n        }, 1000);\r\n    }\r\n    unset() {\r\n        clearInterval(this.intervalId);\r\n        this.node.textContent = '0';\r\n    }\r\n}\r\nclass Results {\r\n    constructor() {\r\n        this.node = document.getElementById('last_100_results');\r\n    }\r\n    setTable(data) {\r\n        this.tableNode = _view_analytics_results__WEBPACK_IMPORTED_MODULE_4__[\"getTable\"](data);\r\n        this.node.append(this.tableNode);\r\n    }\r\n    replaceTable(data) {\r\n        _view_analytics_results__WEBPACK_IMPORTED_MODULE_4__[\"replaceTable\"](this.tableNode, data);\r\n    }\r\n    prependToTable(resultRow) {\r\n        if (this.tableNode) {\r\n            this.tableNode.children[1].prepend(_view_analytics_results__WEBPACK_IMPORTED_MODULE_4__[\"getTableRow\"](resultRow));\r\n        }\r\n        else {\r\n            this.setTable([resultRow]);\r\n        }\r\n    }\r\n}\r\nclass DownLoadResultsButton {\r\n    constructor() {\r\n        this.node = _shared_ViewHelp__WEBPACK_IMPORTED_MODULE_3__[\"findButtonElement\"]('downloadResults');\r\n        this.node.addEventListener('click', this.clickHandler);\r\n        this.clickHandler = this.clickHandler.bind(this);\r\n    }\r\n    clickHandler(event) {\r\n        _shared_TypingSchoolIndexedDbQueries__WEBPACK_IMPORTED_MODULE_1__[\"getAllData\"](_shared_IndexedDb__WEBPACK_IMPORTED_MODULE_0__[\"default\"].db)\r\n            .then((data) => {\r\n            const element = document.createElement('a');\r\n            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(data)));\r\n            element.setAttribute('download', 'TypingSchoolData.json');\r\n            element.style.display = 'none';\r\n            document.body.appendChild(element);\r\n            element.click();\r\n            document.body.removeChild(element);\r\n        })\r\n            .catch((error) => console.log(error));\r\n    }\r\n}\r\nclass LanguageSelect {\r\n    constructor(setLanguage) {\r\n        this.node = _shared_ViewHelp__WEBPACK_IMPORTED_MODULE_3__[\"findSelectElement\"](LanguageSelect.elementName);\r\n        this.node.style.display = '';\r\n        this.setLanguage = setLanguage;\r\n        _shared_ViewHelp__WEBPACK_IMPORTED_MODULE_3__[\"setSelectElementOptions\"](this.node, _shared_TypingTest__WEBPACK_IMPORTED_MODULE_2__[\"languages\"]);\r\n        this.clickEventHandler = this.clickEventHandler.bind(this);\r\n        this.node.addEventListener('change', this.clickEventHandler);\r\n    }\r\n    clickEventHandler() {\r\n        this.setLanguage(this.node.value);\r\n    }\r\n}\r\nLanguageSelect.elementName = 'selectLanguage';\r\nclass ModeSelect {\r\n    constructor(setMode) {\r\n        this.node = _shared_ViewHelp__WEBPACK_IMPORTED_MODULE_3__[\"findSelectElement\"](ModeSelect.elementName);\r\n        this.node.style.display = '';\r\n        this.setMode = setMode;\r\n        _shared_ViewHelp__WEBPACK_IMPORTED_MODULE_3__[\"setSelectElementOptions\"](this.node, _shared_TypingTest__WEBPACK_IMPORTED_MODULE_2__[\"modes\"]);\r\n        this.clickEventHandler = this.clickEventHandler.bind(this);\r\n        this.node.addEventListener('change', this.clickEventHandler);\r\n    }\r\n    clickEventHandler() {\r\n        this.setMode(this.node.value);\r\n    }\r\n}\r\nModeSelect.elementName = 'selectMode';\r\nconst appMarkBinded = ' ra-b';\r\n\n\n//# sourceURL=webpack:///./src/app/view.ts?");

/***/ }),

/***/ "./src/app/view/analytics-results.ts":
/*!*******************************************!*\
  !*** ./src/app/view/analytics-results.ts ***!
  \*******************************************/
/*! exports provided: getTable, replaceTable, getTableRow, setTableRow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getTable\", function() { return getTable; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"replaceTable\", function() { return replaceTable; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getTableRow\", function() { return getTableRow; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setTableRow\", function() { return setTableRow; });\n/* harmony import */ var _shared_AnalyticsResult__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/AnalyticsResult */ \"./src/app/shared/AnalyticsResult.ts\");\n\r\nfunction getTable(data) {\r\n    const table = document.createElement('table');\r\n    table.classList.add('results-table');\r\n    const thead = document.createElement('thead');\r\n    const tr = document.createElement('tr');\r\n    for (let i = 0; i < _shared_AnalyticsResult__WEBPACK_IMPORTED_MODULE_0__[\"analyticsResultsKeys\"].length; i++) {\r\n        const th = document.createElement('th');\r\n        th.textContent = _shared_AnalyticsResult__WEBPACK_IMPORTED_MODULE_0__[\"analyticsResultsKeys\"][i];\r\n        tr.appendChild(th);\r\n    }\r\n    thead.appendChild(tr);\r\n    table.appendChild(thead);\r\n    const tbody = document.createElement('tbody');\r\n    for (let i = 0; i < data.length; i++) {\r\n        tbody.appendChild(getTableRow(data[i]));\r\n    }\r\n    table.appendChild(tbody);\r\n    return table;\r\n}\r\nfunction replaceTable(parent, data) {\r\n    const tbody = parent.children[1];\r\n    const trs = tbody.getElementsByTagName('tr');\r\n    if (trs.length === data.length) {\r\n        for (let i = 0; i < data.length; i++) {\r\n            setTableRow(trs[i], data[i]);\r\n        }\r\n    }\r\n    else if (trs.length > data.length) {\r\n        for (let i = 0; i < data.length; i++) {\r\n            setTableRow(trs[i], data[i]);\r\n        }\r\n        for (let i = trs.length - 1; i >= data.length; i--) {\r\n            tbody.removeChild(trs[i]);\r\n        }\r\n    }\r\n    else if (trs.length < data.length) {\r\n        for (let i = 0; i < trs.length; i++) {\r\n            setTableRow(trs[i], data[i]);\r\n        }\r\n        for (let i = trs.length; i < data.length; i++) {\r\n            tbody.appendChild(getTableRow(data[i]));\r\n        }\r\n    }\r\n}\r\nfunction getTableRow(row) {\r\n    const tr = document.createElement('tr');\r\n    for (let j = 0; j < _shared_AnalyticsResult__WEBPACK_IMPORTED_MODULE_0__[\"analyticsResultsKeys\"].length; j++) {\r\n        const td = document.createElement('td');\r\n        td.textContent = JSON.stringify(row[_shared_AnalyticsResult__WEBPACK_IMPORTED_MODULE_0__[\"analyticsResultsKeys\"][j]]);\r\n        tr.appendChild(td);\r\n    }\r\n    return tr;\r\n}\r\nfunction setTableRow(tr, row) {\r\n    const tds = tr.getElementsByTagName('td');\r\n    for (let i = 0; i < _shared_AnalyticsResult__WEBPACK_IMPORTED_MODULE_0__[\"analyticsResultsKeys\"].length; i++) {\r\n        tds[i].textContent = JSON.stringify(row[_shared_AnalyticsResult__WEBPACK_IMPORTED_MODULE_0__[\"analyticsResultsKeys\"][i]]);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/view/analytics-results.ts?");

/***/ }),

/***/ "./src/app/view/text-chunk.ts":
/*!************************************!*\
  !*** ./src/app/view/text-chunk.ts ***!
  \************************************/
/*! exports provided: renderTextChunk, setTextChunk */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderTextChunk\", function() { return renderTextChunk; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setTextChunk\", function() { return setTextChunk; });\nfunction renderTextChunk(parent, textChunk) {\r\n    for (let i = 0; i < textChunk.length; i++) {\r\n        appendSpanElement(parent, textChunk[i]);\r\n    }\r\n}\r\nfunction setTextChunk(parent, textChunk, currentIndex) {\r\n    const spans = parent.getElementsByTagName('span');\r\n    if (spans.length === textChunk.length) {\r\n        setSpansList(spans, textChunk, currentIndex);\r\n    }\r\n    else if (spans.length < textChunk.length) {\r\n        setSpansList(spans, textChunk, currentIndex);\r\n        for (let i = spans.length; i < textChunk.length; i++) {\r\n            appendSpanElement(parent, textChunk[i]);\r\n        }\r\n    }\r\n    else if (spans.length > textChunk.length) {\r\n        setSpansListTextToTextLength(spans, textChunk, currentIndex);\r\n        removeSpansFromIndex(parent, spans, textChunk.length);\r\n    }\r\n}\r\nfunction appendSpanElement(parent, text) {\r\n    const span = document.createElement('span');\r\n    span.classList.add('word');\r\n    span.textContent = text + '\\u00A0';\r\n    parent.appendChild(span);\r\n    parent.appendChild(document.createTextNode(' '));\r\n}\r\nfunction setSpansList(spans, textChunk, currentIndex) {\r\n    for (let i = 0; i < spans.length; i++) {\r\n        spans[i].textContent = textChunk[i] + '\\u00A0';\r\n    }\r\n    for (let i = 0; i < currentIndex; i++) {\r\n        spans[i].classList.remove('done');\r\n    }\r\n    spans[currentIndex].classList.remove('current');\r\n}\r\nfunction setSpansListTextToTextLength(spans, textChunk, currentIndex) {\r\n    for (let i = 0; i < textChunk.length; i++) {\r\n        spans[i].textContent = textChunk[i] + '\\u00A0';\r\n    }\r\n    for (let i = 0; i < currentIndex; i++) {\r\n        spans[i].classList.remove('done');\r\n    }\r\n    spans[currentIndex].classList.remove('current');\r\n}\r\nfunction removeSpansFromIndex(parent, spans, startIndex) {\r\n    for (let i = spans.length; i <= startIndex; i--) {\r\n        parent.removeChild(spans[i]);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/view/text-chunk.ts?");

/***/ })

/******/ });