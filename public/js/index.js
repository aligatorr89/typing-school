import App from './app';
import { getTextData } from './api';

(function() {
  const app = new App();

  getTextData()
  .then(data => {
    app.setTextData(data);
    textDiv.innerHTML = showTextDataChunk();
  })
  .catch(error => error);

  const textDiv = document.getElementById('words');
  const userInput = document.getElementById('typing');
  const refreshButton = document.getElementById('refreshText');
  const results = document.getElementById('previous_result');

  let spaceCount = 0;
  let start = 0;

  userInput.addEventListener('keyup', function(event) {
    start = start ? start : Date.now();
    if(event.keyCode === 32) {
      spaceKeyupDisableCorrection(event);
    }
  });

  function spaceKeyupDisableCorrection(event) {
    app.analyizeWord(userInput.value, spaceCount, Date.now() - start);
    const span = textDiv.getElementsByClassName('word')[spaceCount];
    span.setAttribute('class', span.getAttribute('class') + ' done');
    userInput.value = '';
    spaceCount++;
    start = Date.now();
  }

  refreshButton.addEventListener('click', function() {
    start = 0;
    spaceCount = 0;
    showResults();
    textDiv.innerHTML = showTextDataChunk();
  });

  function showTextDataChunk() {
    return app.getTextChunk().map(word => '<span class="word">' + word + '</span>').join(' ')
  }

  function showResults() {
    results.innerHTML = '<pre>' + JSON.stringify(app.analyzePrevious()) + '</pre>';
  }
})();
