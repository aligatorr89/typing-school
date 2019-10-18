import App, { appSettingsInitialState, IAppSettings } from './app';
import { Analytics } from './shared/Analytics';
import { TypingTest } from './shared/TypingTest';

import IDB from './shared/IndexedDb';
import * as IDBQueries from './shared/TypingSchoolIndexedDbQueries';
import * as View from './view';

(() => {
  const app = new App();
  const typingTest = new TypingTest();
  IDB.instance
  .then((db) => {
    IDBQueries.getLast100Results(db, app.currentSettings)
    .then((res) => resultsView.setTable(res));
  })
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
    IDBQueries.getLast100Results(IDB.db, app.currentSettings)
    .then((res) => {
      endTestEventHandler();
      resultsView.replaceTable(res);
    });
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
      textView.nextWordHighlight(typingTest.currentWordCount);
      userInputView.node.value = '';
      analytics.insert(writtenWord, typingTest.currentWord, nowDate - typingTest.currentWordTime);
      typingTest.nextWord(writtenWord, nowDate);
    } else if (event.keyCode === 27) {
      endTestEventHandler();
    }
  }

  function spaceKeyupDisableCorrection() {
    textView.highlightPrevious(typingTest.currentWordCount - 1);
    textView.highlightCurrent(typingTest.currentWordCount);
    userInputView.node.value = '';
  }

  function endTestEventHandler() {
    const analyticsResult = analytics.analyzePrevious(app.currentSettings);
    resultsView.prependToTable(analyticsResult);
    IDB.insertData('analytics', analyticsResult);
    typingTest.setNew(app.newTextChunk());
    timerView.unset();
    textView.set(app.textChunk);
    userInputView.node.value = '';
    userInputView.node.addEventListener('keydown', keyDownEventHandler);
  }

})();
