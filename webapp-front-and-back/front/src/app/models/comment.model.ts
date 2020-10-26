import { defaultsDeep } from 'lodash';
import {Survey} from './survey.model';

export class Comment {
    id: number;
    value: string;
    survey: Survey;

    constructor(comment? : Partial <Comment>) {
        defaultsDeep(this, comment);
    }
}

