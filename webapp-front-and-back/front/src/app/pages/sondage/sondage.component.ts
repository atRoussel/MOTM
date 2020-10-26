import { Component, OnInit } from '@angular/core';
import {Survey} from '../../models/survey.model';
import {SurveyService} from '../../services/survey.service';
import {CommentService} from '../../services/comment.service';
import { defaultsDeep } from 'lodash';
import {Observable} from 'rxjs';
import {AnswerService} from '../../services/answer.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-sondage',
  templateUrl: './sondage.component.html',
  styleUrls: ['./sondage.component.css']
})
export class SondageComponent implements OnInit {
  selectedMood = '';
  myTextarea;
  surveys: Survey[];
  lastSurvey: Survey;
  lastId;
  constructor(private surveyService: SurveyService, private  commentService: CommentService, private answerService: AnswerService,
              private router: Router, private _location: Location) { }
  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe(surveys => this.lastSurvey = surveys[surveys.length-1]);
  }
  onSubmit() {
    const comment = defaultsDeep({
      id: null,
      value: this.myTextarea,
      survey: this.lastSurvey,
    });
    this.commentService.addComment(comment).subscribe(comments => console.log(comments));

    const answer = defaultsDeep({
      id: null,
      value: this.selectedMood,
      question: this.lastSurvey.questions[0]
    })
    this.answerService.addAnswer(answer).subscribe(answers => console.log(answers));
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
}
