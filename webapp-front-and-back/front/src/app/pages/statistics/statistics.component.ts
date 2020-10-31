import { Component, OnInit } from '@angular/core';
import {CommentService} from '../../services/comment.service';
import {AnswerService} from '../../services/answer.service';
import {Answer} from '../../models/answer.model';
import  {Chart} from 'chart.js';
import {SurveyService} from '../../services/survey.service';
import {Survey} from '../../models/survey.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  surveys: Survey[];
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
  count1 = 0;
  count2 = 0;
  count3 = 0;
  count4 = 0;
  count5 = 0;


  constructor(private surveyService: SurveyService, private answerService: AnswerService) { }
  ngOnInit(): void{
    this.averageResponseList = [];
    this.surveysTitles = [];
    this.surveysAverage = [];
    this.mainComments = [];
    this.surveyService.getSurveys().subscribe(surveys => {
      this.mainSurvey = surveys[surveys.length-1];
      this.mainSurvey.comments.forEach(com => {if(com.value !== ''){this.mainComments.push(com.value)}})
      this.mainSurvey.questions.forEach(qu => {
        this.sum = 0;
        this.average = 0;
        this.ansCount = 0;
        this.res = 0;
        qu.answers.forEach( ans => {
          this.ansCount ++;
          this.sum = this.sum + +ans.value
        })
        this.res = (this.sum / this.ansCount).toFixed();
        this.averageResponseList.push(this.res);
      })
      this.findEmoji(this.averageResponseList[0]);
      this.graphDatas(this.mainSurvey.questions[0].answers);
    });
    this.surveyService.getSurveys().subscribe(surveys => {
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
        this.res = (this.sum / this.ansCount).toFixed();
        this.surveysAverage.push(this.res);
      })

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
          title: {
            display: true},
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            mode: 'index',
            intersect: false,
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
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
  graphDatas(answers: Answer[]) {
      answers.forEach(answer => {
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
}

