import { Component, OnInit } from '@angular/core';
import {CommentService} from '../../services/comment.service';
import {AnswerService} from '../../services/answer.service';
import {Answer} from '../../models/answer.model';
import  {Chart} from 'chart.js';
import {Survey} from "../../models/survey.model";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  comments: Comment[];
  answers: Answer[];
  surveys: Survey[];
  surveyTitles = [];
  sum = 0;
  average;
  sumBySurvey = 0;
  averageBySurvey;
  image;
  count1 = 0;
  count2 = 0;
  count3 = 0;
  count4 = 0;
  count5 = 0;


  constructor(private commentService: CommentService,private answerService: AnswerService, private surveyService) { }
  ngOnInit(): void{

    this.answerService.getAnswers().subscribe(answers => {
      this.answers = answers;
      answers.forEach(answer => this.sum = this.sum + +answer.value);
      this.average = this.sum / answers.length;

      if (this.average <= 2){
        this.image = '/assets/emoji-laughing.svg'
      };
      if (this.average > 2 && this.average < 4) {
        this.image = '/assets/emoji-laughing.svg'
      };
      if (this.average >= 4) {
        this.image = '/assets/emoji-laughing.svg'
      };
      answers.forEach(answer => {
        if(answer.value === 1){
          this.count1 ++
        };
        if(answer.value === 2){
          this.count2 ++
        };
        if(answer.value === 3){
          this.count3 ++
        };
        if(answer.value === 4){
          this.count4 ++
        };
        if(answer.value === 5){
          this.count5 ++
        };
      });
      // tslint:disable-next-line:no-unused-expression
      new Chart('myChart', {
        type: 'bar',
        data: {
          labels: ['1-Je ne veux plus vivre', '2-Mal', '3-Bof', '4-Bien', '5-Super!'],
          datasets: [{
            label: 'Nombres de votes',
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

      /*new Chart('LineChart',{
        type: 'line',
        data: {
          labels: this.surveyTitles,
          datasets: [{
            label: "Moyenne de l'humeur par sondage",
            data: [1,7,4],
            backgroundColor: [
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 0.2)',
            ],
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
      });*/

    });
    //this.surveyService.getSurveys().subscribe(surveys =>{
      //this.surveys = surveys;
      //surveys.forEach(survey => this.surveyTitles.push(survey.title));
    //});

    this.commentService.getComments().subscribe(comments => this.comments = comments);

  }
}

