import { Component, OnInit } from '@angular/core';
import {newArray} from '@angular/compiler/src/util';
import {NgForm} from '@angular/forms';
import { defaultsDeep } from 'lodash';
import {Router} from '@angular/router';
import {SurveyService} from '../../services/survey.service';
import {Survey} from '../../models/survey.model';
import {Question} from '../../models/question.models';
import {QuestionService} from '../../services/question.service';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})
export class AddSurveyComponent implements OnInit {

  surveys: Survey[];
  questions: Question[];

  constructor(private surveyService: SurveyService, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe(surveys => this.surveys = surveys);
  }


  onSubmit(ngForm: NgForm) {

    this.questions = []
    const question = defaultsDeep({
      questionId: null,
      questionText : ngForm.form.value.question});
    this.questions.push(question)


    const survey = defaultsDeep({
      surveyId: null,
      surveyTitle: ngForm.form.value.title,
      surveyDescription: ngForm.form.value.description,
      questions: this.questions

    });
    // tslint:disable-next-line:no-shadowed-variable
    this.surveyService.addSurvey(survey).subscribe(survey => console.log(survey));



  }
}
