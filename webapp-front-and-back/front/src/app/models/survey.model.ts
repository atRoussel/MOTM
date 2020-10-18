import { defaultsDeep } from 'lodash';

export class Survey {
    surveyId: number;
    surveyTitle: string;
    surveyDescription: string;

    constructor(survey?: Partial<Survey>) {
        defaultsDeep(this, survey);
    }
}
