import { Injectable } from '@angular/core';
 import {Survey} from '../models/survey.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
 import {timeout} from 'rxjs/operators';


@Injectable({
   providedIn: 'root'
})
export class SurveyService {

   private url: string;

     constructor(private http: HttpClient) {
        this.url = environment.url;
     }

     getSurveys(): Observable<Survey[]> {
         return this.http.get<Survey[]>(`${this.url}/surveys`).pipe(timeout(10000));
    }

     addSurvey(survey: Survey): Observable<Survey> {
         return this.http.post<any>(`${this.url}/surveys`, survey).pipe(timeout(10000));
    }

     deleteSurvey(id: number): Observable<any> {
         return this.http.delete(`${this.url}/surveys/${id}`).pipe(timeout(10000));
     }

 }
