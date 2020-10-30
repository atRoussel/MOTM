import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Question} from '../models/question.model';
import {Observable} from 'rxjs';
import {timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  addQuestion(question: Question): Observable<Question>{
    return this.http.post<any>(`${this.url}/questions`, question).pipe(timeout(10000));
  }
}
