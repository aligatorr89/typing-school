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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shared_Api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/Api */ \"./src/app/shared/Api.ts\");\n\r\nclass App {\r\n    constructor(language = 'en', mode = '', disableCorrection = true, excerciseType = '10fastfingers') {\r\n        this.language = language;\r\n        this.mode = mode;\r\n        this.disableCorrection = disableCorrection;\r\n        this.excerciseType = excerciseType;\r\n        this.textData = [];\r\n    }\r\n    ;\r\n    getMode() {\r\n        return this.mode;\r\n    }\r\n    ;\r\n    setMode(mode) {\r\n        this.mode = mode;\r\n    }\r\n    ;\r\n    getLanguage() {\r\n        return this.language;\r\n    }\r\n    ;\r\n    setLanguage(language) {\r\n        this.language = language;\r\n    }\r\n    ;\r\n    getTextChunk() {\r\n        this.currentChunkIndex = Math.round(Math.random() * 1000);\r\n        this.currentTextChunk = this.textData[this.currentChunkIndex].split('|');\r\n        return this.currentTextChunk;\r\n    }\r\n    ;\r\n    getCurrentTextChunk() {\r\n        return this.currentTextChunk ? this.currentTextChunk : [];\r\n    }\r\n    ;\r\n    getData() {\r\n        return Object(_shared_Api__WEBPACK_IMPORTED_MODULE_0__[\"getTypingTests\"])()\r\n            .then(data => {\r\n            this.textData = data.split('\\n');\r\n            return true;\r\n        })\r\n            .catch(error => error);\r\n    }\r\n    ;\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\r\n\n\n//# sourceURL=webpack:///./src/app/app.ts?");

/***/ }),

/***/ "./src/app/index.ts":
/*!**************************!*\
  !*** ./src/app/index.ts ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./src/app/app.ts\");\n/* harmony import */ var _shared_TypingTest__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shared/TypingTest */ \"./src/app/shared/TypingTest.ts\");\n/* harmony import */ var _shared_Analytics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/Analytics */ \"./src/app/shared/Analytics.ts\");\n/* harmony import */ var _shared_IndexedDb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/IndexedDb */ \"./src/app/shared/IndexedDb.ts\");\n/* harmony import */ var _shared_TypingSchoolIndexedDbQueries__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared/TypingSchoolIndexedDbQueries */ \"./src/app/shared/TypingSchoolIndexedDbQueries.ts\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view */ \"./src/app/view.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n(function () {\r\n    const app = new _app__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    let typingTest;\r\n    const analytics = new _shared_Analytics__WEBPACK_IMPORTED_MODULE_2__[\"Analytics\"]();\r\n    const idb = new _shared_IndexedDb__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\r\n    app.getData()\r\n        .then(res => {\r\n        typingTest = new _shared_TypingTest__WEBPACK_IMPORTED_MODULE_1__[\"TypingTest\"](app.getTextChunk());\r\n        Object(_shared_TypingSchoolIndexedDbQueries__WEBPACK_IMPORTED_MODULE_4__[\"getLast100Results\"])(idb.db).then(res => resultsView.setTable(res));\r\n        textView.set(app.getCurrentTextChunk());\r\n    })\r\n        .catch(error => error);\r\n    const textView = new _view__WEBPACK_IMPORTED_MODULE_5__[\"Text\"]();\r\n    const userInputView = new _view__WEBPACK_IMPORTED_MODULE_5__[\"UserInput\"](keyDownEventHandler, keyUpEventHandler);\r\n    const refreshButtonView = new _view__WEBPACK_IMPORTED_MODULE_5__[\"RefreshButton\"]();\r\n    const timerView = new _view__WEBPACK_IMPORTED_MODULE_5__[\"Timer\"]();\r\n    const resultsView = new _view__WEBPACK_IMPORTED_MODULE_5__[\"Results\"]();\r\n    userInputView.node.focus();\r\n    userInputView.node.addEventListener('keydown', keyDownEventHandler);\r\n    userInputView.node.addEventListener('keyup', keyUpEventHandler);\r\n    refreshButtonView.node.addEventListener('click', endTestEventHandler);\r\n    function keyDownEventHandler(event) {\r\n        if (event.keyCode !== 27) {\r\n            typingTest.start();\r\n            userInputView.node.removeEventListener('keydown', keyDownEventHandler);\r\n            timerView.set();\r\n        }\r\n    }\r\n    function keyUpEventHandler(event) {\r\n        if (event.keyCode === 32) {\r\n            const writtenWord = userInputView.node.value;\r\n            const nowDate = Date.now();\r\n            // spaceKeyupDisableCorrection(event);\r\n            textView.nextWordHighlight(typingTest.getCurrentWordCount());\r\n            userInputView.node.value = '';\r\n            analytics.insert(writtenWord, typingTest.getCurrentWord(), nowDate - typingTest.currentWordTimeCounter);\r\n            typingTest.nextWord(writtenWord, nowDate);\r\n        }\r\n        else if (event.keyCode === 27) {\r\n            endTestEventHandler();\r\n        }\r\n    }\r\n    function spaceKeyupDisableCorrection() {\r\n        textView.highlightPrevious(typingTest.getCurrentWordCount() - 1);\r\n        textView.highlightCurrent(typingTest.getCurrentWordCount());\r\n        userInputView.node.value = '';\r\n    }\r\n    function endTestEventHandler() {\r\n        const analyticsResult = analytics.analyzePrevious();\r\n        resultsView.prependToTable(analyticsResult);\r\n        idb.insertData('analytics', analyticsResult);\r\n        typingTest = new _shared_TypingTest__WEBPACK_IMPORTED_MODULE_1__[\"TypingTest\"](app.getTextChunk());\r\n        timerView.unset();\r\n        textView.set(app.getCurrentTextChunk());\r\n        userInputView.node.value = '';\r\n        userInputView.node.addEventListener('keydown', keyDownEventHandler);\r\n    }\r\n})();\r\n\n\n//# sourceURL=webpack:///./src/app/index.ts?");

/***/ }),

/***/ "./src/app/shared/Analytics.ts":
/*!*************************************!*\
  !*** ./src/app/shared/Analytics.ts ***!
  \*************************************/
/*! exports provided: Analytics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Analytics\", function() { return Analytics; });\n/* harmony import */ var _AnalyticsResult__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnalyticsResult */ \"./src/app/shared/AnalyticsResult.ts\");\n\r\nclass Analytics {\r\n    constructor() {\r\n        this.data = [];\r\n        this.prevChunkStart = 0;\r\n        this.prevChunkEnd = 0;\r\n        // this.dbConnection = new indexedDb();\r\n    }\r\n    insert(word, correctWord, timeNeeded) {\r\n        word = word.replace(' ', '');\r\n        this.data.push({\r\n            word, correctWord, timeNeeded\r\n        });\r\n    }\r\n    analyzePrevious() {\r\n        this.prevChunkEnd = this.data.length;\r\n        const previous = this.data.slice(this.prevChunkStart, this.prevChunkEnd);\r\n        return this.analyze(previous);\r\n    }\r\n    analyzeAll() {\r\n        return this.analyze(this.data);\r\n    }\r\n    analyze(dataChunk) {\r\n        const result = new _AnalyticsResult__WEBPACK_IMPORTED_MODULE_0__[\"AnalyticsResult\"]();\r\n        for (let i = 0; i < dataChunk.length; i++) {\r\n            const current = dataChunk[i];\r\n            result.words += 1;\r\n            result.timeNeeded += current.timeNeeded ? current.timeNeeded : 0;\r\n            if (current.word !== current.correctWord && current.word) {\r\n                result.failedWords.push({\r\n                    correct: current.correctWord,\r\n                    actual: current.word\r\n                });\r\n                result.mistakes += 1;\r\n            }\r\n            else {\r\n                result.correctWordCharacters += current.word.length + 1;\r\n            }\r\n            result.allWordCharacters += current.word.length + 1;\r\n        }\r\n        this.prevChunkStart = this.prevChunkEnd;\r\n        result.wpm = Math.round((result.words - result.mistakes) * (100 * 60000 / result.timeNeeded) / 100);\r\n        result.wpm_standard = Math.round(result.correctWordCharacters / 5\r\n            * (100 * 60000 / result.timeNeeded) / 100);\r\n        return result;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/shared/Analytics.ts?");

/***/ }),

/***/ "./src/app/shared/AnalyticsResult.ts":
/*!*******************************************!*\
  !*** ./src/app/shared/AnalyticsResult.ts ***!
  \*******************************************/
/*! exports provided: AnalyticsResult */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"AnalyticsResult\", function() { return AnalyticsResult; });\nclass AnalyticsResult {\r\n    constructor() {\r\n        this.textId = 0;\r\n        this.words = 0;\r\n        this.timeNeeded = 0;\r\n        this.mistakes = 0;\r\n        this.failedWords = [];\r\n        this.correctWordCharacters = 0;\r\n        this.allWordCharacters = 0;\r\n        this.wpm = 0;\r\n        this.wpm_standard = 0;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/shared/AnalyticsResult.ts?");

/***/ }),

/***/ "./src/app/shared/Api.ts":
/*!*******************************!*\
  !*** ./src/app/shared/Api.ts ***!
  \*******************************/
/*! exports provided: typingTestUrl, getTypingTests */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"typingTestUrl\", function() { return typingTestUrl; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getTypingTests\", function() { return getTypingTests; });\nconst typingTestUrl = 'http://localhost:8090/api';\r\nfunction getTypingTests(language = 'en', mode = '') {\r\n    const url = new URL(typingTestUrl);\r\n    url.searchParams.set('language', language);\r\n    url.searchParams.set('mode', mode);\r\n    return fetch(url.toString())\r\n        .then((res) => res.text())\r\n        .catch((error) => error);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/shared/Api.ts?");

/***/ }),

/***/ "./src/app/shared/IndexedDb.ts":
/*!*************************************!*\
  !*** ./src/app/shared/IndexedDb.ts ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return IDB; });\n// const idb = window.indexedDB || window.mozIndexedDB ||\r\n// window.webkitIndexedDB || window.msIndexedDB;\r\n// const idbTransaction = window.IDBTransaction || window.webkitIDBTransaction\r\n// || window.msIDBTransaction || {READ_WRITE: \"readwrite\"};\r\n// This line should only be needed if it is needed to support the object's constants for older browsers\r\n// const idbKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;\r\nclass IDB {\r\n    constructor() {\r\n        this.idbFactory = window.indexedDB;\r\n        if (!this.idbFactory) {\r\n            console.error('Your browser doesn\\'t support a stable version of IndexedDB. Some feature will not be available.');\r\n        }\r\n        getDbConnection(this.idbFactory)\r\n            .then((db) => this.db = db)\r\n            .catch((error) => error);\r\n    }\r\n    getObjectStore(table, mode) {\r\n        return this.db.transaction(table, mode).objectStore(table);\r\n    }\r\n    insertData(table, row) {\r\n        const store = this.getObjectStore(table, 'readwrite');\r\n        const req = store.add(row);\r\n        // req.onsuccess = (evt) => {};\r\n        // req.onerror = () => {};\r\n    }\r\n    getData(table) {\r\n        const store = this.getObjectStore(table, 'readonly');\r\n        const req = store.getAll();\r\n        return new Promise((resolve, reject) => {\r\n            req.onsuccess = (evt) => {\r\n                resolve(req.result);\r\n            };\r\n            req.onerror = () => {\r\n                reject(req.error);\r\n            };\r\n        });\r\n    }\r\n}\r\nfunction getDbConnection(idb) {\r\n    const request = idb.open('typing_school', 5);\r\n    return new Promise((resolve, reject) => {\r\n        request.onerror = (event) => {\r\n            console.error('indexedDB error', request.error);\r\n            reject(request.error);\r\n        };\r\n        request.onsuccess = (event) => {\r\n            console.log('starting indexedDB on version:', request.result.version);\r\n            const db = request.result;\r\n            resolve(db);\r\n        };\r\n        request.onupgradeneeded = (event) => {\r\n            console.log('onupgradeneeded event...', 'oldVersion', event.oldVersion);\r\n            console.log('onupgradeneeded event...', 'newVersion', event.newVersion);\r\n            const db = request.result;\r\n            let store;\r\n            try {\r\n                store = request.transaction.objectStore('analytics');\r\n            }\r\n            catch (e) {\r\n                store = db.createObjectStore('analytics', { keyPath: 'id', autoIncrement: true });\r\n            }\r\n            if (store.indexNames.contains('wpm')) {\r\n                store.createIndex('wpm', 'wpm', { unique: false });\r\n            }\r\n            if (store.indexNames.contains('words')) {\r\n                store.createIndex('words', 'words', { unique: false });\r\n            }\r\n            if (store.indexNames.contains('timeNeeded')) {\r\n                store.createIndex('timeNeeded', 'timeNeeded', { unique: false });\r\n            }\r\n            if (store.indexNames.contains('failedWords')) {\r\n                store.createIndex('failedWords', 'failedWords', { unique: false });\r\n            }\r\n            resolve(db);\r\n        };\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/shared/IndexedDb.ts?");

/***/ }),

/***/ "./src/app/shared/TypingSchoolIndexedDbQueries.ts":
/*!********************************************************!*\
  !*** ./src/app/shared/TypingSchoolIndexedDbQueries.ts ***!
  \********************************************************/
/*! exports provided: getLast100Results */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getLast100Results\", function() { return getLast100Results; });\nfunction getLast100Results(idb) {\r\n    return new Promise((resolve, reject) => {\r\n        const store = idb.transaction('analytics', 'readonly').objectStore('analytics');\r\n        var req = store.openCursor(null, 'prev');\r\n        const result = [];\r\n        let count = 0;\r\n        req.onsuccess = function () {\r\n            const cursor = req.result;\r\n            if (cursor && count < 100) {\r\n                if (cursor.value.words > 3) {\r\n                    result.push(cursor.value);\r\n                    count++;\r\n                }\r\n                cursor.continue();\r\n            }\r\n            else {\r\n                resolve(result);\r\n            }\r\n        };\r\n        req.onerror = function () {\r\n            console.log('IDB.getQuery() error', req.error);\r\n            reject(req.error);\r\n        };\r\n    });\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/shared/TypingSchoolIndexedDbQueries.ts?");

/***/ }),

/***/ "./src/app/shared/TypingTest.ts":
/*!**************************************!*\
  !*** ./src/app/shared/TypingTest.ts ***!
  \**************************************/
/*! exports provided: TypingTest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TypingTest\", function() { return TypingTest; });\nclass TypingTest {\r\n    constructor(textChunk) {\r\n        this.wordCount = 0;\r\n        this.text = textChunk;\r\n    }\r\n    start() {\r\n        this.setStartTime();\r\n    }\r\n    pause() {\r\n        // console.log('pausing...');\r\n    }\r\n    setStartTime() {\r\n        this.startTime = Date.now();\r\n        this.currentWordTimeCounter = this.startTime;\r\n    }\r\n    getTimePassed() {\r\n        return Date.now() - this.startTime;\r\n    }\r\n    getCurrentWord() {\r\n        return this.text[this.wordCount];\r\n    }\r\n    getCurrentWordCount() {\r\n        return this.wordCount;\r\n    }\r\n    nextWord(typedWord, nowDate) {\r\n        // analytics.insert(typedWord, this.text[this.wordCount], newDate - this.currentWordTimeCounter);\r\n        this.currentWordTimeCounter = nowDate;\r\n        this.wordCount++;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/shared/TypingTest.ts?");

/***/ }),

/***/ "./src/app/view.ts":
/*!*************************!*\
  !*** ./src/app/view.ts ***!
  \*************************/
/*! exports provided: Text, UserInput, RefreshButton, Timer, Results */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserInput\", function() { return UserInput; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RefreshButton\", function() { return RefreshButton; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Timer\", function() { return Timer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Results\", function() { return Results; });\nclass Text {\r\n    constructor() {\r\n        this.node = document.getElementById('words');\r\n    }\r\n    set(textChunk) {\r\n        this.node.innerHTML = text(textChunk);\r\n        this.highlightCurrent(0);\r\n    }\r\n    nextWordHighlight(nthChild) {\r\n        this.node.getElementsByClassName('word')[nthChild].classList.replace('current', 'done');\r\n        this.node.getElementsByClassName('word')[nthChild + 1].classList.add('current');\r\n    }\r\n    highlightCurrent(nthChild) {\r\n        this.node.getElementsByClassName('word')[nthChild].classList.add('current');\r\n    }\r\n    highlightPrevious(nthChild) {\r\n        this.node.getElementsByClassName('word')[nthChild].classList.replace('current', 'done');\r\n    }\r\n}\r\nclass UserInput {\r\n    constructor(keyDownEventHandler, keyUpEventHandler) {\r\n        this.node = document.getElementsByTagName('input')[0];\r\n        this.keyDownEventHandler = keyDownEventHandler;\r\n        this.keyUpEventHandler = keyUpEventHandler;\r\n    }\r\n    setUp() {\r\n        this.node.focus();\r\n        this.addKeyDownListener();\r\n        this.addKeyUpListener();\r\n    }\r\n    tearDown() {\r\n        this.removeKeyDownListener();\r\n        this.node.value = '';\r\n        this.node.focus();\r\n    }\r\n    addKeyDownListener() {\r\n        this.node.addEventListener('keydown', this.keyDownEventHandler);\r\n    }\r\n    addKeyUpListener() {\r\n        this.node.addEventListener('keyup', this.keyUpEventHandler);\r\n    }\r\n    removeKeyUpListener() {\r\n        this.node.removeEventListener('keyup', this.keyUpEventHandler);\r\n    }\r\n    removeKeyDownListener() {\r\n        this.node.removeEventListener('keydown', this.keyDownEventHandler);\r\n    }\r\n}\r\nclass RefreshButton {\r\n    constructor() {\r\n        this.node = document.getElementById('refreshText');\r\n    }\r\n}\r\nclass Timer {\r\n    constructor() {\r\n        this.node = document.getElementById('timer');\r\n        this.node.innerText = '0';\r\n        // this.intervalId = 0;\r\n    }\r\n    set() {\r\n        let seconds = 0;\r\n        const node = this.node;\r\n        this.intervalId = setInterval(function () {\r\n            node.innerText = ++seconds + '';\r\n        }, 1000);\r\n    }\r\n    unset() {\r\n        clearInterval(this.intervalId);\r\n        this.node.innerText = '0';\r\n    }\r\n}\r\nclass Results {\r\n    constructor() {\r\n        this.node = document.getElementById('last_100_results');\r\n    }\r\n    setTable(data) {\r\n        this.node.append(getResultsTable(data));\r\n        this.tableNode = this.node.getElementsByClassName('results-table')[0];\r\n    }\r\n    prependToTable(resultRow) {\r\n        if (this.tableNode) {\r\n            this.tableNode.children[1].prepend(getResultsTableRowNode(resultRow));\r\n        }\r\n        else {\r\n            this.setTable([resultRow]);\r\n        }\r\n    }\r\n}\r\nconst resultsTableKeys = ['id', 'words', 'timeNeeded', 'mistakes',\r\n    'correctWordCharacters', 'allWordCharacters', 'failedWords', 'wpm', 'wpm_standard'];\r\nfunction getResultsTable(data) {\r\n    const node = document.createElement('table');\r\n    node.setAttribute('class', 'results-table');\r\n    let table = '<thead><tr>';\r\n    for (let i = 0; i < resultsTableKeys.length; i++) {\r\n        table += '<th class=\"text-center border\">' + resultsTableKeys[i] + '</th>';\r\n    }\r\n    table += '</thead></tr><tbody>';\r\n    if (!Array.isArray(data))\r\n        return '';\r\n    for (let i = 0; i < data.length; i++) {\r\n        table += resultsTableRow(data[i]);\r\n    }\r\n    table += '</tbody>';\r\n    node.innerHTML = table;\r\n    return node;\r\n}\r\nfunction resultsTableRow(row) {\r\n    let tr = '<tr class=\"text-center\">';\r\n    for (let j = 0; j < resultsTableKeys.length; j++) {\r\n        tr += '<td class=\"border\">' + JSON.stringify(row[resultsTableKeys[j]]) + '</td>';\r\n    }\r\n    tr += '</tr>';\r\n    return tr;\r\n}\r\nfunction getResultsTableRowNode(row) {\r\n    const tr = document.createElement('tr');\r\n    tr.className = 'text-center';\r\n    let str = '';\r\n    for (let j = 0; j < resultsTableKeys.length; j++) {\r\n        str += '<td class=\"border\">' + JSON.stringify(row[resultsTableKeys[j]]) + '</td>';\r\n    }\r\n    tr.innerHTML = str;\r\n    return tr;\r\n}\r\nfunction text(textChunk) {\r\n    let html = '';\r\n    for (let i = 0; i < textChunk.length; i++) {\r\n        html += '<span class=\"word\">' + textChunk[i] + '&nbsp;</span> ';\r\n    }\r\n    return html;\r\n}\r\n\n\n//# sourceURL=webpack:///./src/app/view.ts?");

/***/ })

/******/ });