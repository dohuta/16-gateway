import { Note } from '../model/model.module';

export const noteProviders = [
  {
    provide: 'NOTE_REPOSITORY',
    useValue: Note,
  },
];
