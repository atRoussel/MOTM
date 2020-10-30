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
import {QuestionService} from "../../services/question.service";

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
  constructor(private surveyService: SurveyService, private  commentService: CommentService, private answerService: AnswerService,
              private userService: UserService, private  questionService: QuestionService, private router: Router, private _location: Location) { }
  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe(surveys => this.lastSurvey = surveys[surveys.length-1]);
    this.userService.getUsers().subscribe(users => this.users = users);
    document.getElementById('id02').style.display='block';
  }
  onSubmit() {
    const comment = defaultsDeep({
      id: null,
      text: this.myTextarea,
      survey: this.lastSurvey,
    });
    this.commentService.addComment(comment).subscribe(comments => console.log(comments));

    const answer = defaultsDeep({
      id: null,
      value: this.selectedMood,
      question: this.lastSurvey.questions[0]
    })
    this.answerService.addAnswer(answer).subscribe(answers => console.log(answers));

    const question = defaultsDeep({
      id:null,
      value: this.myTextarea,
      survey: this.lastSurvey
    })
    this.questionService.addQuestion(question).subscribe(questions => console.log(questions));
  }
  selectChangeHandler (event: any) {
    this.selectedMood = event.target.value;
  }
  getValue(str) {
    this.myTextarea = str;
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
