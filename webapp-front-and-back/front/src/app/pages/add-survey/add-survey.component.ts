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
  timer;
  surveyWaiting;
  counter = 0;
  localCounter;
  surveys: Survey[];
  questions: Question[];
  selectedId: number = null;
  selectedSurvey: Survey;
  isDisabled = false;

  questionList: string[];
  questionsSize: string[];
  newQuestion: string;

  static mytime(count) {
    const interval = setInterval(() => {
      count--;
      localStorage.setItem('surveyTimer', JSON.stringify(count));
      if (count < 0 ) {
        clearInterval(interval);
      }
    }, 1000);
  }

  constructor(private surveyService: SurveyService, private  questionService: QuestionService) { }

  ngOnInit(): void {
    this.localCounter = JSON.parse(localStorage.getItem('surveyTimer'));
    this.surveyWaiting = JSON.parse(localStorage.getItem('survey'));
    if((this.localCounter !== undefined)&&(this.localCounter !== null)) {
      if(this.localCounter < 1) {
        if((this.surveyWaiting !== undefined)&&(this.localCounter < 1)&&(this.surveyWaiting !== null)) {
          this.surveyService.addSurvey(this.surveyWaiting).subscribe(survey => console.log(survey));
          localStorage.removeItem('survey');
          localStorage.removeItem('surveyTimer');
          window.location.reload();
        }
      } else {
        AddSurveyComponent.mytime(this.localCounter);
        this.isDisabled = true;
      }
    }
    this.selectedSurvey = new Survey();
    this.questionList = [];
    this.questionsSize = [];
    this.surveyService.getSurveys().subscribe(surveys => this.surveys = surveys);
  }

  publishNow() {
    this.surveyWaiting = JSON.parse(localStorage.getItem('survey'));
    this.surveyService.addSurvey(this.surveyWaiting).subscribe(survey => console.log(survey));
    localStorage.removeItem('survey');
    localStorage.removeItem('surveyTimer');
    window.location.reload();
  }

  addSurvey(surveyTitle, surveyDesc, surveyQuestions, surveyId) {
    this.isDisabled = true;
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
      // this.surveyService.addSurvey(survey).subscribe(survey => console.log(survey));
      localStorage.setItem('survey', JSON.stringify(survey));
      AddSurveyComponent.mytime(this.counter);
      this.startCountdown()
      // window.location.reload();
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
  getSelectedSurvey(surv: Survey) {
    this.selectedSurvey = surv;
  }
  selectChangeHandler2(event: any) {
    if((event.target.value < 1)||(event.target.value === '')) {
      this.counter = 0;
    } else this.counter = event.target.value;
  }
  startCountdown() {
    const interval = setInterval(() => {
      this.timer=this.counter
      this.counter--;
      if (this.counter < 0 ) {
      clearInterval(interval);
        window.location.reload();
      }
    }, 1000);
  }
}
