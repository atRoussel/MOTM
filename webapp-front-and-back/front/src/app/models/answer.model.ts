import { defaultsDeep } from 'lodash';

export class Answer {
    id: number;
    value: string;

    constructor(answer?: Partial<Answer>) {
        defaultsDeep(this, answer);
    }
}
