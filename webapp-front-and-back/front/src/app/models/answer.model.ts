import { defaultsDeep } from 'lodash';
import {Question} from './question.model';

export class Answer {
    id: number;
    value: number;
    question: Question;

    constructor(answer?: Partial<Answer>) {
        defaultsDeep(this, answer);
    }
}
