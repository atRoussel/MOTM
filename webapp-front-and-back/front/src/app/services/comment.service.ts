import { Injectable } from '@angular/core';
import {Survey} from '../models/survey.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url: string;
  constructor(private http: HttpClient) {
    this.url = environment.url;
  }
  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.url}/comments`).pipe(timeout(10000));
  }
  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<any>(`${this.url}/comments`, comment).pipe(timeout(10000));
  }
}
