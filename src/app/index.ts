import App from './app';
import { TypingTest } from './shared/TypingTest';
import { Analytics } from './shared/Analytics';
import IDB from './shared/IndexedDb';
import { getLast100Results } from './shared/TypingSchoolIndexedDbQueries';
import * as View from './view';

(function() {
  const app = new App();
  let typingTest;
  const analytics = new Analytics();
  const idb = new IDB();

  app.getData()
  .then(res => {
    typingTest = new TypingTest(app.getTextChunk());
    getLast100Results(idb.db).then(res => resultsView.setTable(res));
    textView.set(app.getCurrentTextChunk());
  })
  .catch(error => error);

  const textView = new View.Text();
  const userInputView = new View.UserInput(keyDownEventHandler, keyUpEventHandler);
  const refreshButtonView = new View.RefreshButton();
  const timerView = new View.Timer();
  const resultsView = new View.Results();

  userInputView.node.focus();
  userInputView.node.addEventListener('keydown', keyDownEventHandler);
  userInputView.node.addEventListener('keyup', keyUpEventHandler);

  refreshButtonView.node.addEventListener('click', endTestEventHandler);

  function keyDownEventHandler(event) {
    if(event.keyCode !== 27) {
      typingTest.start();
      userInputView.node.removeEventListener('keydown', keyDownEventHandler);
      timerView.set();
    }
  }

  function keyUpEventHandler(event) {
    if(event.keyCode === 32) {
      const writtenWord = userInputView.node.value;
      const nowDate = Date.now();
      // spaceKeyupDisableCorrection(event);
      textView.nextWordHighlight(typingTest.getCurrentWordCount());
      userInputView.node.value = '';
      analytics.insert(writtenWord, typingTest.getCurrentWord(), nowDate - typingTest.currentWordTimeCounter);
      typingTest.nextWord(writtenWord, nowDate);
    }
    else if(event.keyCode === 27) {
      endTestEventHandler();
    }
  }

  function spaceKeyupDisableCorrection() {
    textView.highlightPrevious(typingTest.getCurrentWordCount() - 1);
    textView.highlightCurrent(typingTest.getCurrentWordCount());
    userInputView.node.value = '';
  }

  function endTestEventHandler() {
    const analyticsResult = analytics.analyzePrevious();
    resultsView.prependToTable(analyticsResult);
    idb.insertData('analytics', analyticsResult);
    typingTest = new TypingTest(app.getTextChunk());
    timerView.unset();
    textView.set(app.getCurrentTextChunk());
    userInputView.node.value = '';
    userInputView.node.addEventListener('keydown', keyDownEventHandler);
  }

})();
