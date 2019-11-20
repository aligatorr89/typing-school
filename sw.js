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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/service-workers/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/service-workers/index.ts":
/*!**************************************!*\
  !*** ./src/service-workers/index.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/// <reference path='../../node_modules/typescript/lib/lib.es2018.d.ts' />\r\n/// <reference path='../../node_modules/typescript/lib/lib.webworker.d.ts' />\r\nconst CACHE_NAME = 'typing-school-v11RC';\r\nconst CACHE_URLS_INIT = [\r\n    '/',\r\n    '/public/main.css',\r\n    '/public/favicon.ico',\r\n    '/public/js/worker.js',\r\n    '/public/js/bundle.js',\r\n    '/public/manifest.json',\r\n    '/public/404.html'\r\n];\r\nconst CACHE_URL_LAZY_LOAD = [\r\n    '/api?language=en&mode=200',\r\n    '/api?language=en&mode=1000',\r\n    '/api?language=si&mode=200',\r\n    '/api?language=si&mode=1000'\r\n];\r\nconst sw = self;\r\nsw.addEventListener('install', (event) => {\r\n    console.log('serviceWorker is installing...', 'let\\'s add to cache', CACHE_NAME);\r\n    event.waitUntil(caches.open(CACHE_NAME)\r\n        .then((cache) => {\r\n        return cache.addAll(CACHE_URLS_INIT).then(() => {\r\n            cache.addAll(CACHE_URL_LAZY_LOAD)\r\n                .then(() => console.log('urls loaded to cache:', CACHE_URL_LAZY_LOAD));\r\n            console.log('urls loaded to cache:', CACHE_URLS_INIT);\r\n        })\r\n            .catch((error) => console.log('addCacheRespsonse ERROR:', error));\r\n    }));\r\n});\r\nsw.addEventListener('activate', (event) => {\r\n    console.log('serviceWorker server here: is activating...', 'let\\'s delete old caches');\r\n    caches.keys().then((cacheNames) => {\r\n        return Promise.all(cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)\r\n            .map((cacheName) => {\r\n            caches.delete(cacheName);\r\n        }));\r\n    });\r\n});\r\nsw.addEventListener('fetch', (event) => {\r\n    console.log('serviceWorker server here: is fetching...', event.request.url);\r\n    // if (event.request.url.substr(0, 4) === 'http') {}\r\n    event.respondWith(caches.match(event.request)\r\n        .then((response) => {\r\n        if (response !== undefined) {\r\n            console.log('serviceWorker here: serving cached files...', event.request.url);\r\n            return response;\r\n        }\r\n        else {\r\n            return fetch(event.request)\r\n                .then((fetchResponse) => {\r\n                // Check if we received a valid response\r\n                if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {\r\n                    return fetchResponse;\r\n                }\r\n                const responseClone = fetchResponse.clone();\r\n                console.log('serviceWorker here: saving fetch response to cache...', event.request.url);\r\n                caches.open(CACHE_NAME).then((cache) => {\r\n                    cache.put(event.request, responseClone);\r\n                });\r\n            })\r\n                .catch(() => {\r\n                return caches.match('/public/404.html');\r\n            });\r\n        }\r\n    }));\r\n});\r\n\n\n//# sourceURL=webpack:///./src/service-workers/index.ts?");

/***/ })

/******/ });