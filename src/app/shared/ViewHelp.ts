import { Language, Mode } from './TypingTest';

export const appMarkBinded = 'ra-b';

export function findSelectElement(elementName: string): HTMLSelectElement {
  const element = document.querySelector('select[name="' + elementName + '"]') as HTMLSelectElement;
  element.name += appMarkBinded;
  return element;
}

export function setSelectElementOptions(node: HTMLSelectElement, array: Array<Language | Mode>) {
  for (let i = 0; i < array.length; i++) {
    const option = document.createElement('option');
    option.value = array[i];
    option.textContent = array[i];
    node.appendChild(option);
  }
}

export function findButtonElement(elementName: string): HTMLButtonElement {
  const element = document.querySelector('button[name="' + elementName + '"]') as HTMLButtonElement;
  element.name += appMarkBinded;
  return element;
}
