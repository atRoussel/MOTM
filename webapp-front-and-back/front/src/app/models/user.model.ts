import { defaultsDeep } from 'lodash';

export class User {
  id: number;
  name: string;
  mail: string;
  date: string;

  constructor(user?: Partial<User>) {
    defaultsDeep(this, user);
  }
}
