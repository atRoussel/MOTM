import { Component, OnInit } from '@angular/core';
import {AnswerService} from '../../services/answer.service';
import {Answer} from '../../models/answer.model';
import  {Chart} from 'chart.js';
import {SurveyService} from '../../services/survey.service';
import {Survey} from '../../models/survey.model';
import {AddSurveyComponent} from '../add-survey/add-survey.component';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  localCounter;
  surveyWaiting;
  surveys: Survey[];
  reverseSurveys: Survey[];
  surveysTitles: string[];
  mainSurvey: Survey;
  mainComments: string[];
  averageResponseList: number[];
  surveysAverage: number[];
  ansCount = 0;
  res;

  chart;
  historyChart;
  sum = 0;
  average;
  image;
  count1;
  count2;
  count3;
  count4;
  count5;


  constructor(private surveyService: SurveyService, private answerService: AnswerService) { }
  ngOnInit(): void{
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
      } else AddSurveyComponent.mytime(this.localCounter);
    }
    this.reverseSurveys = [];
    this.averageResponseList = [];
    this.surveysTitles = [];
    this.surveysAverage = [];
    this.mainComments = [];
    this.surveyService.getSurveys().subscribe(surveys => {
      this.mainSurvey = surveys[surveys.length-1];
      this.lineGraph();
      this.getMainComments();
      this.getAverageMainResponses();
      this.graphDatas();
    });
    this.surveyService.getSurveys().subscribe(surveys => {
      this.reverseSurveys = surveys;
      this.surveys = surveys;
      this.surveys.forEach( surv => {
        this.surveysTitles.push(surv.title);
        this.sum = 0;
        this.average = 0;
        this.ansCount = 0;
        this.res = 0;
        surv.questions[0].answers.forEach( ans => {
          this.ansCount ++;
          this.sum = this.sum + +ans.value
        })
        this.res = (this.sum / this.ansCount).toFixed(2);
        this.surveysAverage.push(this.res);
      })
      this.lineGraph();
    });
  }
  findEmoji(grade: number) {
    if (grade <= 1){
      this.image = '/assets/emoji-dizzy.svg';
    }
    if (grade > 1 && this.average <= 2) {
      this.image = '/assets/emoji-frown.svg';
    }
    if (grade > 2 && this.average <= 3) {
      this.image = '/assets/emoji-neutral.svg';
    }
    if (grade > 3 && this.average <= 4) {
      this.image = '/assets/emoji-smile.svg';
    }
    if (grade >= 4) {
      this.image = '/assets/emoji-laughing.svg';
    }
  }
  selectChangeHandler (event: any) {
    this.surveys.forEach(surv => {
      if(surv.title === event.target.value) {
        this.mainSurvey = surv;
      }
    })
    this.getAverageMainResponses();
    this.getMainComments();
    this.graphDatas();
    this.lineGraph();
  }
  getAverageMainResponses() {
    this.averageResponseList = [];
    this.mainSurvey.questions.forEach(qu => {
      this.sum = 0;
      this.average = 0;
      this.ansCount = 0;
      this.res = 0;
      qu.answers.forEach( ans => {
        this.ansCount ++;
        this.sum = this.sum + +ans.value
      })
      this.res = (this.sum / this.ansCount).toFixed(2);
      this.averageResponseList.push(this.res);
    })
    this.findEmoji(this.averageResponseList[0]);
  }
  getMainComments() {
    this.mainComments = [];
    this.mainSurvey.comments.forEach(com => {if(com.value !== ''){this.mainComments.push(com.value)}});
  }
  lineGraph() {
    this.historyChart = new Chart('LineChart',{
      type: 'line',
      data: {
        labels: this.surveysTitles,
        datasets: [{
          label: 'Moyenne',
          data: this.surveysAverage,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 0.2)',
          ],
        }]
      },
      options: {
        events: [],
        tooltips: {enabled: false},
        hover: {mode: null},
        title: {
          display: true},
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
  graphDatas() {
    this.count1 = 0;
    this.count2 = 0;
    this.count3 = 0;
    this.count4 = 0;
    this.count5 = 0;

    this.mainSurvey.questions[0].answers.forEach(answer => {
        if(answer.value === 1){
          this.count1 ++
        }
        if(answer.value === 2){
          this.count2 ++
        }
        if(answer.value === 3){
          this.count3 ++
        }
        if(answer.value === 4){
          this.count4 ++
        }
        if(answer.value === 5){
          this.count5 ++
        }
      });

    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ['1 - Affreux', '2 - Mauvais', '3 - Moyen', '4 - Bien', '5 - Génial'],
        datasets: [{
          label: 'Nombre de votes',
          data: [this.count1, this.count2, this.count3, this.count4, this.count5],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        events: [],
        tooltips: {enabled: false},
        hover: {mode: null},
        responsive: true,
        maintainAspectRatio: false,
        showTooltips: false,
        enableInteractivity: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}

