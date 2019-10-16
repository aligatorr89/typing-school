import { Language } from './TypingTest';
export const typingTestUrl = 'http://localhost:8090/api';

export function getTypingTests(language: Language = 'en', mode: string = '') {
  const url = new URL(typingTestUrl);
  url.searchParams.set('language', language);
  url.searchParams.set('mode', mode);

  return fetch(url.toString())
  .then((res) => res.text())
  .catch((error) => error);
}
