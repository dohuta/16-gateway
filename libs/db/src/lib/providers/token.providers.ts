import { Token } from '../model/model.module';

export const tokenProviders = [
  {
    provide: 'TOKEN_REPOSITORY',
    useValue: Token,
  },
];
