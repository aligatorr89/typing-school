import App from './app';
import { TypingTest } from './typing-test';
import * as View from './view';

(function() {
  const app = new App();
  let typingTest;

  app.getData()
  .then(res => {
    typingTest = new TypingTest(app.getTextChunk());
    typingTest.getLast100Results().then(res => resultsView.setTable(res));
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
      typingTest.newWord(userInputView.node.value);
      spaceKeyupDisableCorrection(event);
    }
    else if(event.keyCode === 27) {
      endTestEventHandler();
    }
  }

  function spaceKeyupDisableCorrection() {
    textView.addClassToSpanNthChild('done', typingTest.getCurrentWordCount());
    userInputView.node.value = '';
  }

  function endTestEventHandler() {
    resultsView.prependToTable(typingTest.analyze());
    typingTest = new TypingTest(app.getTextChunk());
    timerView.unset();
    textView.set(app.getCurrentTextChunk());
    userInputView.node.value = '';
    userInputView.node.addEventListener('keydown', keyDownEventHandler);
  }

})();
