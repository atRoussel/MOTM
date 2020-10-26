import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs";
import {Survey} from "../models/survey.model";
import {User} from "../models/user.model";
import {timeout} from "rxjs/operators";
import {Answer} from "../models/answer.model";

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  getAnswers():Observable<Answer[]>{
    return this.http.get<Answer[]>(`${this.url}/answers`).pipe(timeout(10000));
  }
}
