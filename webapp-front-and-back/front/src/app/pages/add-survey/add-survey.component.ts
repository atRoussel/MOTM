import { Component, OnInit } from '@angular/core';
import {newArray} from '@angular/compiler/src/util';
import {NgForm, ReactiveFormsModule} from '@angular/forms';
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
  selectedId: number = null;

  questionList: string[];
  questionsSize: string[];
  newQuestion: string;

  constructor(private surveyService: SurveyService, private  questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionList = [];
    this.questionsSize = [];
    this.surveyService.getSurveys().subscribe(surveys => this.surveys = surveys);
  }

  addSurvey(surveyTitle, surveyDesc, surveyQuestions, surveyId) {
    this.questions = [];
    const question = defaultsDeep({
      id: null,
      text : surveyQuestions,
      answers: null});
    this.questions.push(question)

    if(this.questionList.length > 0) {
      this.questionList.forEach(ques => {
        if(ques !== '') {
          const oneMoreQuestion = defaultsDeep({
            id: null,
            text: ques,
            answers: null,
          });
          this.questions.push(oneMoreQuestion);
        }
      });
    }

    const survey = defaultsDeep({
      id: surveyId,
      title: surveyTitle,
      description: surveyDesc,
      questions: this.questions,
      comments: null
    });

    try{
      // tslint:disable-next-line:no-shadowed-variable
      this.surveyService.addSurvey(survey).subscribe(survey => console.log(survey));
      window.location.reload();
    } catch (e) {
    }
  }

  deleteSurvey(id: number) {
    this.surveyService.deleteSurvey(id).subscribe(succes => {
      this.surveys = this.surveys.filter(survey => survey.id !== id)
    });
  }

  selectChangeHandler (event: any, index: number) {
    this.questionList[index] = event.target.value;
  }
}
