import {defaultsDeep} from 'lodash';
import {Question} from './question.model';
import {User} from './user.model';

export class Answer {
    id: number;
    value: number;
    questions: Question;
    user: User;

    constructor(answer?: Partial<Answer>) {
        defaultsDeep(this, answer);
    }
}
