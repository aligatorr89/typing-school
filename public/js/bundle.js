!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="C:\\Users\\roksp\\Desktop\\sandbox\\typing-school\\public",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);class r{constructor(t="en",e="",n=!0,r="10fastfingers"){this.language=t,this.mode=e,this.disableCorrection=n,this.excerciseType=r,this.textData=[]}}r.prototype.getMode=function(){return this.mode},r.prototype.setMode=function(t){this.mode=t},r.prototype.getLanguage=function(){return this.language},r.prototype.setLanguage=function(t){this.language=t},r.prototype.setTextData=function(t){this.textData=t.split("\n");for(let t=0;t<this.textData.length;t++)this.textData[t]=this.textData[t].split("|")},r.prototype.getTextChunk=function(){return this.currentChunkIndex=Math.round(1e3*Math.random()),this.textData[this.currentChunkIndex]},r.prototype.getCurrentTextChunk=function(){return this.textData[this.currentChunkIndex]?this.textData[this.currentChunkIndex]:[]},r.prototype.getData=function(){return function(t="10fastfingers",e="en",n){return new Promise((t,r)=>{const o=new XMLHttpRequest;o.onreadystatechange=function(){4==this.readyState&&200==this.status&&t(o.responseText)},o.onerror=function(){r(this.statusText)},o.onabort=function(){r(this.statusText)},o.open("GET","api/?language="+e+"&mode="+n,!0),o.send()})}().then(t=>(this.setTextData(t),!0)).catch(t=>t)};var o=r;window.indexedDB||console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");const s=window.indexedDB;class i{constructor(){var t;this.db,(t=s.open("typing_school"),new Promise((e,n)=>{t.onerror=function(t){n()},t.onsuccess=function(t){const n=t.target.result;e(n)},t.onupgradeneeded=function(t){const n=t.currentTarget.result,r=n.createObjectStore("analytics",{keyPath:"id",autoIncrement:!0});r.createIndex("words_count","words_count",{unique:!1}),r.createIndex("timeNeeded","timeNeeded",{unique:!1}),r.createIndex("mistakes","mistakes",{unique:!1}),r.createIndex("wpm","wpm",{unique:!1}),r.createIndex("failedWords","failedWords",{unique:!1}),e(n)}})).then(t=>this.db=t)}getObjectStore(t,e){return this.db.transaction(t,e).objectStore(t)}insertData(t,e){const n=this.getObjectStore(t,"readwrite").add(e);n.onsuccess=function(t){},n.onerror=function(){}}getData(t,e){const n=this.getObjectStore(t,"readonly").getAll();return new Promise((t,e)=>{n.onsuccess=function(e){t(e.target.result)},n.onerror=function(){e(this.error)}})}}const u=new class{constructor(){this.data=[],this.prevChunkStart=0,this.prevChunkEnd=0,this.dbConnection=new i}insert(t,e,n){t=t.replace(" ",""),this.data.push({word:t,correctWord:e,timeNeeded:n})}analyzePrevious(){this.prevChunkEnd=this.data.length-1;const t=this.data.slice(this.prevChunkStart,this.prevChunkEnd),e={words:0,timeNeeded:0,mistakes:0,failedWords:[]};for(let n=0;n<t.length;n++){const r=t[n];e.words+=1,e.timeNeeded+=r.timeNeeded?r.timeNeeded:0,r.word!==r.correctWord&&r.word&&(e.failedWords.push({correct:r.correctWord,actual:r.word}),e.mistakes+=1)}return this.prevChunkStart=this.prevChunkEnd,e.wpm=Math.round((e.words-e.mistakes)*(6e6/e.timeNeeded)/100),this.dbConnection.insertData("analytics",e),e}};class a{constructor(t){this.wordCount=0,this.text=t}start(){this.setStartTime()}pause(){console.log("pausing...")}setStartTime(){this.startTime=Date.now(),this.currentWordTimeCounter=this.startTime}getTimePassed(){return Date.now()-this.startTime}getCurrentWord(){return this.text[this.wordCount]}getCurrentWordCount(){return this.wordCount}newWord(t){const e=Date.now();u.insert(t,this.text[this.wordCount],e-this.currentWordTimeCounter),this.currentWordTimeCounter=e,this.wordCount++}analyze(){return u.analyzePrevious()}}!function(){const t=new o;let e;t.getData().then(n=>{e=new a(t.getTextChunk()),h()}).catch(t=>t);const n=document.getElementById("words"),r=document.getElementById("typing");r.focus();const s=document.getElementById("refreshText"),i=document.getElementById("previous_result"),u=document.getElementById("timer");function d(t){27!==t.keyCode&&(e.start(),r.removeEventListener("keydown",d),function(){let t=0;l=setInterval((function(){u.innerText=++t}),1e3)}())}function c(){i.innerHTML="<pre>"+JSON.stringify(e.analyze())+"</pre>",e=new a(t.getTextChunk()),h(),clearInterval(l),u.innerText=0,r.addEventListener("keydown",d)}function h(){n.innerHTML=t.getCurrentTextChunk().map(t=>'<span class="word">'+t+"</span>").join(" ")}let l;r.addEventListener("keydown",d),r.addEventListener("keyup",(function(t){32===t.keyCode?(e.newWord(r.value),function(){const t=n.getElementsByClassName("word")[e.getCurrentWordCount()-1];t.setAttribute("class",t.getAttribute("class")+" done"),r.value=""}()):27===t.keyCode&&c()})),s.addEventListener("click",c)}()}]);