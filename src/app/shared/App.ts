import { ExcerciseType, Language, Mode } from './TypingTest';

export interface IAppSettings {
  language: Language;
  mode: Mode;
  excerciseType: ExcerciseType;
}

export const appSettingsInitialState: IAppSettings = {
  language: 'en',
  mode:  '200',
  excerciseType: '10fastfingers'
};
