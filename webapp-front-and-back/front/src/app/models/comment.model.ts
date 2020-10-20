import { defaultsDeep } from 'lodash';

export class Comment {
    id: number;
    value: string;

    constructor(comment? : Partial <Comment>) {
        defaultsDeep(this, comment);
    }
}

