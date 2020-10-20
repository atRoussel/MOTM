import { defaultsDeep } from 'lodash';
import {Answer} from './answer.model';

export class Question {
    id: number;
    text: string;
    answers: Answer[];

    constructor(question?: Partial<Question>) {
        defaultsDeep(this, question);
    }
}
