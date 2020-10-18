import { defaultsDeep } from 'lodash';

export class User {
  userId: number;
  userName: string;
  userMail: string;
  userDate: string;

  constructor(user?: Partial<User>) {
    defaultsDeep(this, user);
  }
}
