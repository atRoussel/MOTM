import { defaultsDeep } from 'lodash';
import {Comment} from './comment.model';

export class User {
  id: number;
  name: string;
  mail: string;
  date: string;
  comments: Comment[];

  constructor(user?: Partial<User>) {
    defaultsDeep(this, user);
  }
}
