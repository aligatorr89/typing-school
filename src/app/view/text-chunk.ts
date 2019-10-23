import { TypingTestsType } from '../shared/TypingTest';

export function renderTextChunk(parent: HTMLElement, textChunk: TypingTestsType) {
  for (let i = 0; i < textChunk.length; i++) {
    appendSpanElement(parent, textChunk[i]);
  }
}

export function setTextChunk(
  parent: HTMLElement, textChunk: TypingTestsType, currentIndex: number
) {
  const spans = parent.getElementsByTagName('span');
  if (spans.length === textChunk.length) {
    setSpansList(spans, textChunk, currentIndex);
  } else if (spans.length < textChunk.length) {
    setSpansList(spans, textChunk, currentIndex);
    for (let i = spans.length; i < textChunk.length; i++) {
      appendSpanElement(parent, textChunk[i]);
    }
  } else if (spans.length > textChunk.length) {
    setSpansListTextToTextLength(spans, textChunk, currentIndex);
    removeSpansFromIndex(parent, spans, textChunk.length);
  }
}

function appendSpanElement(parent: HTMLElement, text: string) {
  const span = document.createElement('span');
  span.classList.add('word');
  span.textContent = text + '\u00A0';
  parent.appendChild(span);
  parent.appendChild(document.createTextNode(' '));
}

function setSpansList(spans: HTMLCollectionOf<HTMLSpanElement>, textChunk: TypingTestsType, currentIndex: number) {
  for (let i = 0; i < spans.length; i++) {
    spans[i].textContent = textChunk[i] + '\u00A0';
  }
  for (let i = 0; i < currentIndex; i++) {
    spans[i].classList.remove('done');
  }
  spans[currentIndex].classList.remove('current');
}

function setSpansListTextToTextLength(
  spans: HTMLCollectionOf<HTMLSpanElement>, textChunk: TypingTestsType, currentIndex: number
) {
  for (let i = 0; i < textChunk.length; i++) {
    spans[i].textContent = textChunk[i] + '\u00A0';
  }
  for (let i = 0; i < currentIndex; i++) {
    spans[i].classList.remove('done');
  }
  spans[currentIndex].classList.remove('current');
}

function removeSpansFromIndex(parent: HTMLElement, spans: HTMLCollectionOf<HTMLSpanElement>, startIndex: number) {
  for (let i = spans.length; i <= startIndex; i--) {
    parent.removeChild(spans[i]);
  }
}
