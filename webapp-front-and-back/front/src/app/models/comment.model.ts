import {defaultsDeep} from 'lodash';
import {Survey} from './survey.model';
import {User} from './user.model';

export class Comment {
    id: number;
    value: string;
    survey: Survey;
    user: User;

    constructor(comment?: Partial<Comment>) {
        defaultsDeep(this, comment);
    }
}

