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
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/analytics.js":
/*!********************************!*\
  !*** ./public/js/analytics.js ***!
  \********************************/
/*! exports provided: Analytics */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Analytics\", function() { return Analytics; });\n/* harmony import */ var _indexedDB__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./indexedDB */ \"./public/js/indexedDB.js\");\n\r\n\r\nclass Analytics {\r\n  constructor() {\r\n    this.data = [];\r\n    this.prevChunkStart = 0;\r\n    this.prevChunkEnd = 0;\r\n    this.dbConnection = new _indexedDB__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n  }\r\n\r\n  insert(word, correctWord, timeNeeded) {\r\n    word = word.replace(' ', '');\r\n    this.data.push({\r\n      word, correctWord, timeNeeded\r\n    });\r\n  }\r\n\r\n  analyzePrevious() {\r\n    this.prevChunkEnd = this.data.length;\r\n    const previous = this.data.slice(this.prevChunkStart, this.prevChunkEnd);\r\n    const result = {\r\n      words: 0,\r\n      timeNeeded: 0,\r\n      mistakes: 0,\r\n      correctWordCharacters: 0,\r\n      allWordCharacters: 0,\r\n      failedWords: []\r\n    };\r\n    for(let i = 0; i < previous.length; i++) {\r\n      const current = previous[i];\r\n      result.words += 1;\r\n      result.timeNeeded += current.timeNeeded ? current.timeNeeded : 0;\r\n      if(current.word !== current.correctWord && current.word) {\r\n        result.failedWords.push({\r\n          correct: current.correctWord,\r\n          actual: current.word\r\n        });\r\n        result.mistakes += 1;\r\n      }\r\n      else {\r\n        result.correctWordCharacters += current.word.length + 1;\r\n      }\r\n      result.allWordCharacters += current.word.length + 1;\r\n    }\r\n    this.prevChunkStart = this.prevChunkEnd;\r\n\r\n    result.wpm = Math.round((result.words - result.mistakes) * (100 * 60000 / result.timeNeeded) / 100);\r\n    result.wpm_standard = Math.round(result.correctWordCharacters / 5\r\n      * (100 * 60000 / result.timeNeeded) / 100);\r\n    this.dbConnection.insertData('analytics', result);\r\n    return result;\r\n  }\r\n\r\n  getLast100Results() {\r\n    return this.dbConnection.getData('analytics')\r\n    .then(res => {\r\n      const startIndex = res.length < 101 ? 0 : res.length - 100;\r\n      return res.slice(startIndex, res.length).reverse();\r\n    });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./public/js/analytics.js?");

/***/ }),

/***/ "./public/js/api.js":
/*!**************************!*\
  !*** ./public/js/api.js ***!
  \**************************/
/*! exports provided: getTextData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getTextData\", function() { return getTextData; });\n\r\nfunction getTextData(type = '10fastfingers', language = 'en', mode) {\r\n  return new Promise((resolve, reject) => {\r\n    const xhttp = new XMLHttpRequest();\r\n    xhttp.onreadystatechange = function() {\r\n        if(this.readyState == 4 && this.status == 200) {\r\n          resolve(xhttp.responseText);\r\n        }\r\n    };\r\n    xhttp.onerror = function() {\r\n      reject(this.statusText);\r\n    };\r\n    xhttp.onabort = function() {\r\n      reject(this.statusText);\r\n    };\r\n    xhttp.open(\"GET\", 'api/' + '?language=' + language + '&mode=' + mode, true);\r\n    xhttp.send();\r\n  });\r\n};\r\n\n\n//# sourceURL=webpack:///./public/js/api.js?");

/***/ }),

/***/ "./public/js/app.js":
/*!**************************!*\
  !*** ./public/js/app.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ \"./public/js/api.js\");\n\r\n\r\nclass App {\r\n  constructor(language = 'en', mode = '', disableCorrection = true, excerciseType = '10fastfingers') {\r\n    this.language = language;\r\n    this.mode = mode;\r\n    this.disableCorrection = disableCorrection;\r\n    this.excerciseType = excerciseType;\r\n    this.textData = [];\r\n  };\r\n}\r\nApp.prototype.getMode = function() {\r\n  return this.mode;\r\n};\r\nApp.prototype.setMode = function(mode) {\r\n  this.mode = mode;\r\n};\r\nApp.prototype.getLanguage = function() {\r\n  return this.language;\r\n};\r\nApp.prototype.setLanguage = function(language) {\r\n  this.language = language;\r\n};\r\nApp.prototype.setTextData = function(text) {\r\n  this.textData = text.split('\\n');\r\n  for(let i = 0; i < this.textData.length; i++) {\r\n    this.textData[i] = this.textData[i].split('|');\r\n  }\r\n};\r\nApp.prototype.getTextChunk = function() {\r\n  this.currentChunkIndex = Math.round(Math.random() * 1000);\r\n  return this.textData[this.currentChunkIndex];\r\n};\r\nApp.prototype.getCurrentTextChunk = function() {\r\n  return this.textData[this.currentChunkIndex] ? this.textData[this.currentChunkIndex] : [];\r\n};\r\nApp.prototype.getData = function() {\r\n  return Object(_api__WEBPACK_IMPORTED_MODULE_0__[\"getTextData\"])()\r\n  .then(data => {\r\n    this.setTextData(data);\r\n    return true;\r\n  })\r\n  .catch(error => error)\r\n};\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\r\n\n\n//# sourceURL=webpack:///./public/js/app.js?");

/***/ }),

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app */ \"./public/js/app.js\");\n/* harmony import */ var _typing_test__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./typing-test */ \"./public/js/typing-test.js\");\n/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ \"./public/js/view.js\");\n\r\n\r\n\r\n\r\n(function() {\r\n  const app = new _app__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n  let typingTest;\r\n\r\n  app.getData()\r\n  .then(res => {\r\n    typingTest = new _typing_test__WEBPACK_IMPORTED_MODULE_1__[\"TypingTest\"](app.getTextChunk());\r\n    typingTest.getLast100Results().then(res => resultsView.setTable(res));\r\n    textView.set(app.getCurrentTextChunk());\r\n  })\r\n  .catch(error => error);\r\n\r\n  const textView = new _view__WEBPACK_IMPORTED_MODULE_2__[\"Text\"]();\r\n  const userInputView = new _view__WEBPACK_IMPORTED_MODULE_2__[\"UserInput\"](keyDownEventHandler, keyUpEventHandler);\r\n  const refreshButtonView = new _view__WEBPACK_IMPORTED_MODULE_2__[\"RefreshButton\"]();\r\n  const timerView = new _view__WEBPACK_IMPORTED_MODULE_2__[\"Timer\"]();\r\n  const resultsView = new _view__WEBPACK_IMPORTED_MODULE_2__[\"Results\"]();\r\n\r\n  userInputView.node.focus();\r\n  userInputView.node.addEventListener('keydown', keyDownEventHandler);\r\n  userInputView.node.addEventListener('keyup', keyUpEventHandler);\r\n\r\n  refreshButtonView.node.addEventListener('click', endTestEventHandler);\r\n\r\n  function keyDownEventHandler(event) {\r\n    if(event.keyCode !== 27) {\r\n      typingTest.start();\r\n      userInputView.node.removeEventListener('keydown', keyDownEventHandler);\r\n      timerView.set();\r\n    }\r\n  }\r\n\r\n  function keyUpEventHandler(event) {\r\n    if(event.keyCode === 32) {\r\n      typingTest.newWord(userInputView.node.value);\r\n      spaceKeyupDisableCorrection(event);\r\n    }\r\n    else if(event.keyCode === 27) {\r\n      endTestEventHandler();\r\n    }\r\n  }\r\n\r\n  function spaceKeyupDisableCorrection() {\r\n    textView.addClassToSpanNthChild('done', typingTest.getCurrentWordCount());\r\n    userInputView.node.value = '';\r\n  }\r\n\r\n  function endTestEventHandler() {\r\n    resultsView.prependToTable(typingTest.analyze());\r\n    typingTest = new _typing_test__WEBPACK_IMPORTED_MODULE_1__[\"TypingTest\"](app.getTextChunk());\r\n    timerView.unset();\r\n    textView.set(app.getCurrentTextChunk());\r\n    userInputView.node.value = '';\r\n    userInputView.node.addEventListener('keydown', keyDownEventHandler);\r\n  }\r\n\r\n})();\r\n\n\n//# sourceURL=webpack:///./public/js/index.js?");

/***/ }),

/***/ "./public/js/indexedDB.js":
/*!********************************!*\
  !*** ./public/js/indexedDB.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return IDB; });\nconst databases = [\r\n  'typing_school'\r\n];\r\nconst tables = [\r\n  'words_typed',\r\n  'analytics'\r\n];\r\n/*window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;\r\n// DON'T use \"var indexedDB = ...\" if you're not in a function.\r\n// Moreover, you may need references to some window.IDB* objects:\r\nwindow.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: \"readwrite\"}; // This line should only be needed if it is needed to support the object's constants for older browsers\r\nwindow.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;*/\r\nif (!window.indexedDB) {\r\n  console.log(\"Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.\");\r\n}\r\n\r\nconst idb = window.indexedDB;\r\n\r\nclass IDB {\r\n  constructor() {\r\n    this.db;\r\n    getDbConnection()\r\n    .then(db => this.db = db);\r\n  }\r\n  getObjectStore(table, mode) {\r\n    var tx = this.db.transaction(table, mode);\r\n    return tx.objectStore(table);\r\n  }\r\n  insertData(table, row) {\r\n    const store = this.getObjectStore(table, 'readwrite');\r\n    const req = store.add(row);\r\n    req.onsuccess = function (evt) {\r\n    };\r\n    req.onerror = function() {\r\n      // console.error(\"add to db error\", this.error);\r\n    };\r\n  }\r\n  getData(table, query) {\r\n    const store = this.getObjectStore(table, 'readonly');\r\n    const req = store.getAll();\r\n    return new Promise((resolve, reject) => {\r\n      req.onsuccess = function (evt) {\r\n        resolve(evt.target.result);\r\n      };\r\n      req.onerror = function() {\r\n        reject(this.error);\r\n      };\r\n    });\r\n  }\r\n}\r\n\r\nfunction getDbConnection() {\r\n  var request = idb.open('typing_school');\r\n\r\n  return new Promise((resolve, reject) => {\r\n    request.onerror = function(event) {\r\n      reject();\r\n    };\r\n\r\n    request.onsuccess = function(event) {\r\n      const db = event.target.result;\r\n      resolve(db);\r\n    };\r\n\r\n    request.onupgradeneeded = function(event) {\r\n      const db = event.currentTarget.result;\r\n      const store = db.createObjectStore(\r\n        'analytics', {keyPath: 'id', autoIncrement: true});\r\n\r\n      store.createIndex('words_count', 'words_count', { unique: false });\r\n      store.createIndex('timeNeeded', 'timeNeeded', { unique: false });\r\n      store.createIndex('mistakes', 'mistakes', { unique: false });\r\n      store.createIndex('wpm', 'wpm', { unique: false });\r\n      store.createIndex('failedWords', 'failedWords', { unique: false });\r\n\r\n      resolve(db);\r\n    };\r\n  })\r\n};\r\n\n\n//# sourceURL=webpack:///./public/js/indexedDB.js?");

/***/ }),

/***/ "./public/js/typing-test.js":
/*!**********************************!*\
  !*** ./public/js/typing-test.js ***!
  \**********************************/
/*! exports provided: TypingTest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"TypingTest\", function() { return TypingTest; });\n/* harmony import */ var _analytics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./analytics */ \"./public/js/analytics.js\");\n\r\n\r\nconst analytics = new _analytics__WEBPACK_IMPORTED_MODULE_0__[\"Analytics\"]();\r\n\r\nclass TypingTest {\r\n  constructor(textChunk) {\r\n    this.wordCount = 0;\r\n    this.text = textChunk;\r\n  }\r\n\r\n  start() {\r\n    this.setStartTime();\r\n  }\r\n\r\n  pause() {\r\n    console.log('pausing...');\r\n  }\r\n\r\n  setStartTime() {\r\n    this.startTime = Date.now();\r\n    this.currentWordTimeCounter = this.startTime;\r\n  }\r\n\r\n  getTimePassed() {\r\n    return Date.now() - this.startTime;\r\n  }\r\n\r\n  getCurrentWord() {\r\n    return this.text[this.wordCount];\r\n  }\r\n\r\n  getCurrentWordCount() {\r\n    return this.wordCount;\r\n  }\r\n\r\n  newWord(typedWord) {\r\n    const newDate = Date.now();\r\n    analytics.insert(typedWord, this.text[this.wordCount], newDate - this.currentWordTimeCounter);\r\n    this.currentWordTimeCounter = newDate;\r\n    this.wordCount++;\r\n  }\r\n\r\n  analyze() {\r\n    return analytics.analyzePrevious();\r\n  }\r\n\r\n  getLast100Results() {\r\n    return analytics.getLast100Results();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./public/js/typing-test.js?");

/***/ }),

/***/ "./public/js/view.js":
/*!***************************!*\
  !*** ./public/js/view.js ***!
  \***************************/
/*! exports provided: Text, UserInput, RefreshButton, Timer, Results */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Text\", function() { return Text; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserInput\", function() { return UserInput; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RefreshButton\", function() { return RefreshButton; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Timer\", function() { return Timer; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Results\", function() { return Results; });\n\r\nclass Text {\r\n  constructor() {\r\n      this.node = document.getElementById('words');\r\n  }\r\n  set(textChunk) {\r\n    this.node.innerHTML = text(textChunk);\r\n  }\r\n  addClassToSpanNthChild(className, nthChild) {\r\n    const span = this.node.getElementsByClassName('word')[nthChild - 1];\r\n    span.setAttribute('class', span.getAttribute('class') + ' ' + className);\r\n  }\r\n}\r\n\r\nclass UserInput {\r\n  constructor(keyDownEventHandler, keyUpEventHandler) {\r\n    this.node = document.getElementById('typing');\r\n    this.keyDownEventHandler = keyDownEventHandler;\r\n    this.keyUpEventHandler = keyUpEventHandler;\r\n  }\r\n\r\n  setUp() {\r\n    this.node.focus();\r\n    this.addKeyDownListener();\r\n    this.addKeyUpListener();\r\n  }\r\n\r\n  tearDown() {\r\n    this.removeKeyDownListener();\r\n    this.node.value = '';\r\n    this.node.focus();\r\n  }\r\n\r\n  addKeyDownListener() {\r\n    this.node.addEventListener('keydown', this.keyDownEventHandler);\r\n  }\r\n\r\n  addKeyUpListener() {\r\n    this.node.addEventListener('keyup', this.keyUpEventHandler);\r\n  }\r\n\r\n  removeKeyUpListener() {\r\n    this.node.removeEventListener('keyup', this.keyUpEventHandler);\r\n  }\r\n\r\n  removeKeyDownListener() {\r\n    this.node.removeEventListener('keydown', this.keyDownEventHandler);\r\n  }\r\n}\r\n\r\nclass RefreshButton {\r\n  constructor() {\r\n    this.node = document.getElementById('refreshText');\r\n  }\r\n}\r\n\r\nclass Timer {\r\n  constructor() {\r\n    this.node = document.getElementById('timer');\r\n    this.intervalId = 0;\r\n  }\r\n\r\n  set() {\r\n    let seconds = 0;\r\n    const node = this.node;\r\n    this.intervalId = setInterval(function() {\r\n        node.innerText = ++seconds;\r\n    }, 1000);\r\n  }\r\n\r\n  unset() {\r\n    clearInterval(this.intervalId);\r\n    this.node.innerText = 0;\r\n  }\r\n}\r\n\r\nclass Results {\r\n  constructor() {\r\n    this.node = document.getElementById('last_100_results');\r\n  }\r\n  setTable(data) {\r\n    this.node.append(getResultsTable(data));\r\n    this.tableNode = this.node.getElementsByClassName('results-table')[0];\r\n  }\r\n  prependToTable(resultRow) {\r\n    console.log(this.tableNode.children)\r\n    if(this.tableNode.children[1]) {\r\n      this.tableNode.children[1].prepend(getResultsTableRowNode(resultRow));\r\n    }\r\n  }\r\n}\r\n\r\nconst resultsTableKeys = ['id', 'words', 'timeNeeded','mistakes',\r\n'correctWordCharacters','allWordCharacters','failedWords' ,'wpm','wpm_standard'];\r\nfunction getResultsTable(data) {\r\n  const node = document.createElement('table');\r\n  node.setAttribute('class', 'results-table');\r\n  let table = '<thead><tr>';\r\n  for(let i = 0; i < resultsTableKeys.length; i++) {\r\n    table += '<th class=\"text-center border\">' + resultsTableKeys[i] + '</th>';\r\n  }\r\n  table += '</thead></tr><tbody>';\r\n  if(!Array.isArray(data)) return '';\r\n\r\n  for(let i = 0; i < data.length; i++) {\r\n    table += resultsTableRow(data[i]);\r\n  }\r\n  table += '</tbody>';\r\n  node.innerHTML = table;\r\n  return node;\r\n}\r\n\r\nfunction resultsTableRow(row) {\r\n  let tr = '<tr class=\"text-center\">';\r\n  for(let j = 0; j < resultsTableKeys.length; j++) {\r\n    tr += '<td class=\"border\">' + JSON.stringify(row[resultsTableKeys[j]]) + '</td>';\r\n  }\r\n  tr += '</tr>';\r\n  return tr;\r\n}\r\n\r\nfunction getResultsTableRowNode(row) {\r\n  const tr = document.createElement('tr');\r\n  tr.className = 'text-center';\r\n  let str = '';\r\n  for(let j = 0; j < resultsTableKeys.length; j++) {\r\n    str += '<td class=\"border\">' + JSON.stringify(row[resultsTableKeys[j]]) + '</td>';\r\n  }\r\n  tr.innerHTML = str;\r\n  return tr;\r\n}\r\n\r\nfunction text(textChunk) {\r\n  let html = '';\r\n  for(let i = 0; i < textChunk.length; i++) {\r\n    html += '<span class=\"word\">' + textChunk[i] + '&nbsp;</span> ';\r\n  }\r\n  return html;\r\n}\r\n\n\n//# sourceURL=webpack:///./public/js/view.js?");

/***/ })

/******/ });