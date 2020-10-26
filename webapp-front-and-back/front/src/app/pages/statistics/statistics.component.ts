import { Component, OnInit } from '@angular/core';
import {CommentService} from '../../services/comment.service';
import {AnswerService} from '../../services/answer.service';
import {Answer} from '../../models/answer.model';

// import  {Chart} from 'chart.js'

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

  constructor(private commentService: CommentService, private answerService: AnswerService) { }

  ngOnInit(): void{
    this.answerService.getAnswers().subscribe(answers => {
      this.answers = answers;
      answers.forEach(answer => this.sum = this.sum + +answer.value);
    });
    this.commentService.getComments().subscribe(comments => this.comments = comments);
  }
  display() {
    console.log(this.sum);
  }
}

