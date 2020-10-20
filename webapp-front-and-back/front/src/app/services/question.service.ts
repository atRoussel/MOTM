import { Injectable } from '@angular/core';
import {Survey} from '../models/survey.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';
import {Question} from '../models/question.model';


@Injectable({
    providedIn: 'root'
})
export class QuestionService {

    private url: string;

    constructor(private http: HttpClient) {
        this.url = environment.url;
    }

     addQuestion(question: Question): Observable<Question> {
        return this.http.post<any>(`${this.url}/questions`, question).pipe(timeout(10000));
    }


}
