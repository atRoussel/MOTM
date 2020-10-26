import { Injectable } from '@angular/core';
import {Survey} from '../models/survey.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';
import {Answer} from '../models/answer.model';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.url;
  }
  getAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.url}/answers`).pipe(timeout(10000));
  }
  addAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<any>(`${this.url}/answers`, answer).pipe(timeout(10000));
  }
}
