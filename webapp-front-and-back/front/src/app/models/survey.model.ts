import { defaultsDeep } from 'lodash';
import {Question} from './question.models';

export class Survey {
    surveyId: number;
    surveyTitle: string;
    surveyDescription: string;
    questions: Array<Question>;

    constructor(survey?: Partial<Survey>) {
        defaultsDeep(this, survey);
    }
}
