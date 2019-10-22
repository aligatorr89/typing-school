import { Language } from './TypingTest';
export const typingTestUrl = 'http://localhost:8090/api';

export function getTypingTests(language: Language = 'en', mode: string = ''): Promise<string> {
  const url = new URL(typingTestUrl);
  url.searchParams.set('language', language);
  url.searchParams.set('mode', mode);

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.responseType = 'text';
    request.open('GET', url.toString(), true);
    request.send();

    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        resolve(request.responseText);
      }
    };
    request.onerror = () => {
      reject(request.statusText);
    };
    request.onabort = () => {
      reject(request.statusText);
    };
  });
}
