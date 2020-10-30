import { Component, OnInit } from '@angular/core';
import {Survey} from '../../models/survey.model';
import {SurveyService} from '../../services/survey.service';
import { defaultsDeep } from 'lodash';
import {AnswerService} from '../../services/answer.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {CommentService} from '../../services/comment.service';
import {Comment} from '../../models/comment.model';

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
  userCo: User;
  updateId: number;
  updateAnsId: number;

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
    this.lastSurvey.comments.forEach(com => {
      this.userCo.comments.forEach(comm => {
        if(com.id === comm.id) {
          this.updateId = com.id
        }
      })
    })
    const comment = defaultsDeep({
      id: this.updateId,
      value: commentValue,
      survey: commentSurvey,
      user: this.userCo,
    });
    this.commentService.addComment(comment).subscribe(comments => console.log(comments));

    this.lastSurvey.questions.forEach( (qu, i) => {
      qu.answers.forEach(ans => {
         this.userCo.answers.forEach(userAns => {
           if(ans.id === userAns.id) {
             this.updateAnsId = ans.id;
           }
         })
      })
      const answer = defaultsDeep({
        id: this.updateAnsId,
        value: this.responseGrid[i],
        question: commentSurvey.questions[i],
        user: this.userCo,
      })
      this.answerService.addAnswer(answer).subscribe();
    })
  }
  refresh() {
    window.location.reload();
  }
  checkEmail(str) {
    this.users.forEach(user => {
      if(user.mail === str) {
        this.userCo = user;
        document.getElementById('id02').style.display='none';
      }
    })
  }
}
