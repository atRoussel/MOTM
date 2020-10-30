import { defaultsDeep } from 'lodash';
import {Comment} from './comment.model';
import {Answer} from './answer.model';

export class User {
  id: number;
  name: string;
  mail: string;
  date: string;
  comments: Comment[];
  answers: Answer[];

  constructor(user?: Partial<User>) {
    defaultsDeep(this, user);
  }
}
