import { defaultsDeep } from 'lodash';
import {Answer} from './answer.model';
import {Survey} from './survey.model';

export class Question {
    id: number;
    text: string;
    answers: Answer[];
    survey: Survey;

    constructor(question?: Partial<Question>) {
        defaultsDeep(this, question);
    }
}
