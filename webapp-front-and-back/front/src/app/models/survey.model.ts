import { defaultsDeep } from 'lodash';
import {Question} from './question.model';
import {Comment} from './comment.model';

export class Survey {
    id: number;
    title: string;
    description: string;
    questions: Question[];
    comments: Comment[];

    constructor(survey?: Partial<Survey>) {
        defaultsDeep(this, survey);
    }
}
