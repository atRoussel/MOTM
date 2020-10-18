import { defaultsDeep } from 'lodash';

export class Survey {
    id: number;
    title: string;
    description: string;

    constructor(survey?: Partial<Survey>) {
        defaultsDeep(this, survey);
    }
}
