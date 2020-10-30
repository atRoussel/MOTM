import { Component, OnInit } from '@angular/core';
import {Survey} from '../../models/survey.model';
import {SurveyService} from '../../services/survey.service';
import {CommentService} from '../../services/comment.service';
import { defaultsDeep } from 'lodash';
import {Observable} from 'rxjs';
import {AnswerService} from '../../services/answer.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-sondage',
  templateUrl: './sondage.component.html',
  styleUrls: ['./sondage.component.css']
})
export class SondageComponent implements OnInit {
  selectedMood = '';
  myTextarea;
  surveys: Survey[];
  users: User[];
  lastSurvey: Survey;
  responseGrid: string[];

  constructor(private surveyService: SurveyService, private  commentService: CommentService, private answerService: AnswerService,
              private userService: UserService, private router: Router, private _location: Location) { }
  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe(surveys => this.lastSurvey = surveys[surveys.length-1]);
    this.userService.getUsers().subscribe(users => this.users = users);
    document.getElementById('id02').style.display='block';
    this.responseGrid = [];
  }
  selectChangeHandler (event: any, index: number) {
    this.selectedMood = event.target.value;
    this.responseGrid[index] = this.selectedMood;
  }
  addComment(commentValue, commentSurvey) {
    const comment = defaultsDeep({
      id: null,
      value: commentValue,
      survey: commentSurvey,
      user: this.users[0],
    });
    this.commentService.addComment(comment).subscribe(comments => console.log(comments));

    this.lastSurvey.questions.forEach((qu, i) =>{
      const answer = defaultsDeep({
        id: null,
        value: this.responseGrid[i],
        question: commentSurvey.questions[i]
      })
      this.answerService.addAnswer(answer).subscribe(answers => console.log(answers));
    });
  }
  refresh() {
    window.location.reload();
  }
  checkEmail(str) {
    this.users.forEach(user => {
      if(user.mail === str) {
        document.getElementById('id02').style.display='none';
      }
    })
  }
}
