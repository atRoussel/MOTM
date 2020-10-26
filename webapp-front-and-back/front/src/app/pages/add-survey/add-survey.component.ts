import { Component, OnInit } from '@angular/core';
import {newArray} from '@angular/compiler/src/util';
import {NgForm} from '@angular/forms';
import { defaultsDeep } from 'lodash';
import {Router} from '@angular/router';
import {SurveyService} from '../../services/survey.service';
import {Survey} from '../../models/survey.model';
import {Question} from '../../models/question.model';
import {QuestionService} from '../../services/question.service';
import {tryCatch} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})
export class AddSurveyComponent implements OnInit {

  surveys: Survey[];
  questions: Question[];

  constructor(private surveyService: SurveyService) { }

  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe(surveys => this.surveys = surveys);
  }


  onSubmit(ngForm: NgForm) {

    this.questions = []
    const question = defaultsDeep({
      id: null,
      text : ngForm.form.value.question,
      answers: null});
    this.questions.push(question)


    const survey = defaultsDeep({
      id: null,
      title: ngForm.form.value.title,
      description: ngForm.form.value.description,
      questions: this.questions,
      comments: null

    });

    try{
      // tslint:disable-next-line:no-shadowed-variable
      this.surveyService.addSurvey(survey).subscribe(survey => console.log(survey));
      window.alert('reussi') ;
      window.location.reload();
    } catch (e) {
     window.alert('PB') ;
    }




  }
}
