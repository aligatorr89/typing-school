import App from './app';
import { TypingTest } from './typing-test';

(function() {
  const app = new App();
  let typingTest;

  app.getData()
  .then(res => {
    typingTest = new TypingTest(app.getTextChunk());
    showTextDataChunk();
  })
  .catch(error => error);

  const textDiv = document.getElementById('words');
  const userInput = document.getElementById('typing');
  userInput.focus();
  const refreshButton = document.getElementById('refreshText');
  const results = document.getElementById('previous_result');
  const timer = document.getElementById('timer');

  function keyDownEvent(event) {
    if(event.keyCode !== 27) {
      typingTest.start();
      userInput.removeEventListener('keydown', keyDownEvent);
      showTimerInterval();
    }
  }

  function keyUpEvent(event) {
    if(event.keyCode === 32) {
      typingTest.newWord(userInput.value);
      spaceKeyupDisableCorrection(event);
    }
    else if(event.keyCode === 27) {
      endTestEvent();
    }
  }

  function endTestEvent() {
    showResults();
    typingTest = new TypingTest(app.getTextChunk());
    showTextDataChunk();
    deleteTimer();
    userInput.addEventListener('keydown', keyDownEvent);
  }

  userInput.addEventListener('keydown', keyDownEvent);
  userInput.addEventListener('keyup', keyUpEvent);
  refreshButton.addEventListener('click', endTestEvent);

  function spaceKeyupDisableCorrection() {
    const span = textDiv.getElementsByClassName('word')[typingTest.getCurrentWordCount() - 1];
    span.setAttribute('class', span.getAttribute('class') + ' done');
    userInput.value = '';
  }

  function showTextDataChunk() {
    textDiv.innerHTML = app.getCurrentTextChunk().map(word => '<span class="word">' + word + '</span>').join(' ')
  }

  function showResults() {
    results.innerHTML = '<pre>' + JSON.stringify(typingTest.analyze()) + '</pre>';
  }

  let timerInterval;
  function showTimerInterval() {
    let seconds = 0;
    timerInterval = setInterval(function() {
        timer.innerText = ++seconds;
    }, 1000);
  }
  function deleteTimer() {
    clearInterval(timerInterval);
    timer.innerText = 0;
  }
})();
