import App from './app';
import { Analytics } from './shared/Analytics';
import { TypingTest } from './shared/TypingTest';

import SW from './shared/serviceWorker';
import { postMessageData, postMessageResponse, worker } from './shared/WebWorker';
import * as View from './view';

(() => {
  SW.setServiceWorker();
  const app = new App();
  const typingTest = new TypingTest();
  worker.postMessage(postMessageData('getLast100Rows', null, app.currentSettings));
  postMessageResponse()
  .then((res) => resultsView.setTable(res.data))
  .catch((error) => console.log(error));

  app.getData()
  .then(() => {
    typingTest.setNew(app.newTextChunk());
    textView.set(app.textChunk);
  })
  .catch((error) => console.log(error));
  const analytics = new Analytics();

  const textView = new View.Text();
  const userInputView = new View.UserInput(keyDownEventHandler, keyUpEventHandler);
  const refreshButtonView = new View.RefreshButton();
  const timerView = new View.Timer();
  const resultsView = new View.Results();
  const downloadButtonView = new View.DownLoadResultsButton();
  const languageSelectView = new View.LanguageSelect(app.setLanguage);
  const modeSelectView = new View.ModeSelect(app.setMode);

  userInputView.node.focus();
  userInputView.node.addEventListener('keydown', keyDownEventHandler);
  userInputView.node.addEventListener('keyup', keyUpEventHandler);

  refreshButtonView.node.addEventListener('click', endTestEventHandler);

  app.node.addEventListener('setLanguage', changeSettings);
  app.node.addEventListener('setMode', changeSettings);

  function changeSettings() {
    worker.postMessage(postMessageData('getLast100Rows', null, app.currentSettings));
    postMessageResponse()
    .then((res) => {
      endTestEventHandler();
      resultsView.replaceTable(res.data);
    })
    .catch((error) => console.log(error));
  }

  function keyDownEventHandler(event) {
    if (event.keyCode !== 27) {
      typingTest.start();
      userInputView.node.removeEventListener('keydown', keyDownEventHandler);
      timerView.set();
    }
  }

  function keyUpEventHandler(event) {
    if (event.keyCode === 32) {
      const writtenWord = userInputView.node.value;
      const nowDate = Date.now();
      // spaceKeyupDisableCorrection(event);
      textView.nextWordHighlight();
      userInputView.node.value = '';
      analytics.insert(writtenWord, typingTest.currentWord, nowDate - typingTest.currentWordTime, app.currentSettings);
      typingTest.nextWord(nowDate);
    } else if (event.keyCode === 27) {
      endTestEventHandler();
    }
  }

  function spaceKeyupDisableCorrection() {
    textView.nextWordHighlight();
    userInputView.node.value = '';
  }

  function endTestEventHandler() {
    analytics.analyzePrevious(app.currentSettings)
    .then((res) => resultsView.prependToTable(res));
    timerView.unset();
    typingTest.setNew(app.newTextChunk());
    textView.set(app.textChunk);
    userInputView.node.value = '';
    userInputView.node.addEventListener('keydown', keyDownEventHandler);
  }
})();
