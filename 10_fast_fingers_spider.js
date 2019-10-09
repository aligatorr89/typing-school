'use strict';
const https = require('https');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');
const os = require('os');

const get10FastFingersLanguageId = (isoCode) => {
  switch(isoCode) {
    case 'en':
      return 1;
    case 'si':
      return 46;
    default:
      return 1;
  }
};

const args = process.argv;
const languageIndex = args.indexOf('lang');
const language = languageIndex > -1 ? get10FastFingersLanguageId(args[languageIndex + 1]) : 1;
const difficultyModeIndex = args.indexOf('advanced');
const difficultyMode = difficultyModeIndex > -1 ? 'advanced' : '';

const databaseFilename = '10_fast_fingers_database_' + args[languageIndex + 1] + (difficultyMode ? '_' + difficultyMode : '') + '.txt';
const databaseFilePath = path.join(__dirname, databaseFilename);
const databaseFileStream = fs.createWriteStream(databaseFilePath, {'flags': 'a'});

const postData = querystring.stringify({
  speedtest_mode: difficultyMode,
  speedtest_id: language
});
const options = {
  host: '10fastfingers.com',
  path: '/speedtests/get_words',
  method: 'POST',
  headers: {
   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
   'Content-Length': Buffer.byteLength(postData),
   'Accept': '*/*',
   'X-Requested-With': 'XMLHttpRequest'
 },
 '--compressed': ''
};

(async function() {
  let count = 0;
  while(count < 1000) {
    const req = https.request(options, res => {
      let str = "";
      res.setEncoding('utf8');

      res.on('data', data => {
        str += data.toString();
      });
      res.on('error', error => {
        console.log(error);
      });
      res.on('end', () => {
        databaseFileStream.write(str + os.EOL);
        if(count === 999) {
          databaseFileStream.destroy();
        }
      });
    });
    req.on('error', e => {
      console.error(e);
    });
    req.write(postData, 'utf8', (success) => {});
    req.end();
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });
    count++;
  }
})();


// curl 'https://10fastfingers.com/speedtests/get_words' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: same-origin' -H 'Origin: https://10fastfingers.com' -H 'Accept-Encoding: gzip, deflate, br' -H 'Accept-Language: en-US,en;q=0.9,sl;q=0.8' -H 'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' -H 'Accept: */*' -H 'Referer: https://10fastfingers.com/advanced-typing-test/english' -H 'X-Requested-With: XMLHttpRequest' -H $'Cookie: CAKEPHP=b13ru38miaq86iduhc8jitgjku; CakeCookie[lang]=Q2FrZQ%3D%3D.5exP; CakeCookie[alternate_language_suggestion]=Q2FrZQ%3D%3D.9PBdWA%3D%3D; _ga=GA1.2.719569354.1570580799; _gid=GA1.2.966727004.1570580799; CookieConsent={stamp:\'60qJeqQrOX3z3pPMsxucqV6baHltzNt097rU5yK5MRrf4jJLnHhpiw==\'%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:1%2Cutc:1570580789621%2Ciab:\'BOoI5yEOoI5yECGABBENCh-AAAAp57v______9______9uz_Ov_v_f__33e8__9v_l_7_-___u_-3zd4u_1vf99yfm1-7etr3tp_87ues2_Xur__79__3z3_9phP78k89r7337Ew-v83oA\'}; __gads=ID=927a1b069b06e500:T=1570580790:S=ALNI_Ma2gFUXQFLImgpWsySmvf2bYVkvbg; __qca=P0-1202854822-1570580801328; _fbp=fb.1.1570580802207.1114078574; freewheel-detected-bandwidth=197' -H 'Connection: keep-alive' --data 'speedtest_mode=advanced&speedtest_id=1' --compressed

// REQUEST HEADERS
// POST /speedtests/get_words HTTP/1.1
// Host: 10fastfingers.com
// Connection: keep-alive
// Content-Length: 38
// Accept: */*
// Origin: https://10fastfingers.com
// X-Requested-With: XMLHttpRequest
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36
// Sec-Fetch-Mode: cors
// Content-Type: application/x-www-form-urlencoded; charset=UTF-8
// Sec-Fetch-Site: same-origin
// Referer: https://10fastfingers.com/advanced-typing-test/english
// Accept-Encoding: gzip, deflate, br
// Accept-Language: en-US,en;q=0.9,sl;q=0.8
// Cookie: CAKEPHP=b13ru38miaq86iduhc8jitgjku; CakeCookie[lang]=Q2FrZQ%3D%3D.5exP; CakeCookie[alternate_language_suggestion]=Q2FrZQ%3D%3D.9PBdWA%3D%3D; _ga=GA1.2.719569354.1570580799; _gid=GA1.2.966727004.1570580799; CookieConsent={stamp:'60qJeqQrOX3z3pPMsxucqV6baHltzNt097rU5yK5MRrf4jJLnHhpiw=='%2Cnecessary:true%2Cpreferences:true%2Cstatistics:true%2Cmarketing:true%2Cver:1%2Cutc:1570580789621%2Ciab:'BOoI5yEOoI5yECGABBENCh-AAAAp57v______9______9uz_Ov_v_f__33e8__9v_l_7_-___u_-3zd4u_1vf99yfm1-7etr3tp_87ues2_Xur__79__3z3_9phP78k89r7337Ew-v83oA'}; __gads=ID=927a1b069b06e500:T=1570580790:S=ALNI_Ma2gFUXQFLImgpWsySmvf2bYVkvbg; __qca=P0-1202854822-1570580801328; _fbp=fb.1.1570580802207.1114078574; freewheel-detected-bandwidth=197

// you do not need cookie :)

// RESPONSE HEADERS
// HTTP/1.1 200 OK
// Content-Encoding: gzip
// Content-Type: text/html; charset=UTF-8
// Date: Wed, 09 Oct 2019 00:42:13 GMT
// Server: Apache
// Vary: Accept-Encoding
// Content-Length: 1038
// Connection: keep-alive
