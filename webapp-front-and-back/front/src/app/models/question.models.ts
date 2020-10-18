import { defaultsDeep } from 'lodash';

export class Question {
    questionId: number;
    questionText: string;

    constructor(question?: Partial<Question>) {
        defaultsDeep(this, question);
    }
}
