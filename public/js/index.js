'use strict';
(function() {
  var app = new window.__APP_TYPING_SCHOOL.APP();

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
        app.setText(xhttp.responseText);
        textDiv.innerHTML = app.getTextChunk();
      }
  };
  xhttp.open("GET", 'api/' + '?language=' + app.language + '&mode=' + app.mode, true);
  xhttp.send();

  var textDiv = document.getElementById('words');
  var userInput = document.getElementById('typing');
  var refreshButton = document.getElementById('refreshText');

  var spaceCount = 0;
  userInput.addEventListener('keyup', function(event) {
    if(event.keyCode === 32) {
      spaceKeyupDisableCorrection(event);
    }
  });

  function spaceKeyupDisableCorrection(event) {
    app.checkCorrect(userInput.value, spaceCount);
    
    var span = textDiv.getElementsByClassName('word')[spaceCount];
    span.setAttribute('class', span.getAttribute('class') + ' done');
    userInput.value = '';
    spaceCount++;
  }

  refreshButton.addEventListener('click', function() {
    console.log(app.statistics);
    spaceCount = 0;
    textDiv.innerHTML = app.getTextChunk();
  });

})();
