import { defaultsDeep } from 'lodash';
import {Question} from './question.model';
import {Comment} from './comment.model';
import {Answer} from './answer.model';

export class Survey {
    id: number;
    title: string;
    description: string;
    questions: Question[];
    comments: Comment[];
    answers: Answer[];

    constructor(survey?: Partial<Survey>) {
        defaultsDeep(this, survey);
    }
}
