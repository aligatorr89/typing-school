
export function getTextData(type = '10fastfingers', language = 'en', mode) {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
          resolve(xhttp.responseText);
        }
    };
    xhttp.onerror = function() {
      reject(this.statusText);
    };
    xhttp.onabort = function() {
      reject(this.statusText);
    };
    xhttp.open("GET", 'api/' + '?language=' + language + '&mode=' + mode, true);
    xhttp.send();
  });
};
