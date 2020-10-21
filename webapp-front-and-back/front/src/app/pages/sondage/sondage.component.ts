import { Component, OnInit } from '@angular/core';
import {Survey} from '../../models/survey.model';
import {SurveyService} from '../../services/survey.service';
import {CommentService} from '../../services/comment.service';
import { defaultsDeep } from 'lodash';

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
  constructor(private surveyService: SurveyService, private  commentService: CommentService) { }
  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe(surveys => this.lastSurvey = surveys[surveys.length-1]);
  }
  onSubmit() {
    const comment = defaultsDeep({
      commentId: null,
      commentText: this.myTextarea,
      surveyId: this.lastSurvey.id
    });
    console.log(this.selectedMood);
    this.commentService.addComment(comment).subscribe();
    console.log(this.myTextarea);
  }
  selectChangeHandler (event: any) {
    this.selectedMood = event.target.value;
  }
  getValue(str) {
    this.myTextarea = str;
  }
}
