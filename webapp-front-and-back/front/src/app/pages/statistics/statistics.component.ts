import { Component, OnInit } from '@angular/core';
import {CommentService} from "../../services/comment.service";
import {AnswerService} from "../../services/answer.service";
import {Comment} from "../../models/comment.model";
import {Answer} from "../../models/answer.model";
import  {Chart} from 'chart.js'

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  comments: Comment[];
  answers: Answer[];
  sum = 0;
  average;

  constructor(private commentService: CommentService) { }

  sumGrades(){
    this.answerService.getAnswers().subscribe(answers => {
      this.answers = answers;
      answers.forEach(answer => this.sum = this.sum + +answer.value);
      });
  }

  ngOnInit(): void{
    //this.answerService.getAnswers().subscribe(answers => {
      //this.answers = answers;
      //answers.forEach(answer => this.sum = this.sum + +answer.value);
    //});
    this.commentService.getComments().subscribe(comments => this.comments = comments);

    new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Je ne veux plus vivre', 'Mal', 'Bof', 'Bien', 'Super!'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
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

