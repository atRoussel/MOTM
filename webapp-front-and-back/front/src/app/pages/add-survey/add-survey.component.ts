import { Component, OnInit } from '@angular/core';
import {newArray} from '@angular/compiler/src/util';
import {FormArray, FormBuilder, FormGroup, NgForm, ReactiveFormsModule} from '@angular/forms';
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

  questionForm: FormGroup;
  surveys: Survey[];
  questions: Question[];

  constructor(private surveyService: SurveyService, private fb: FormBuilder) {
    this.questionForm = this.fb.group({

      name: '',

      quantities: this.fb.array([]) ,

    });
  }

  quantities() : FormArray {

    return this.questionForm.get('quantities') as FormArray

  }



  newQuantity(): FormGroup {

    return this.fb.group({

      qty: '',

      price: '',

    })

  }



  addQuantity() {

    this.quantities().push(this.newQuantity());

  }



  removeQuantity(i:number) {

    this.quantities().removeAt(i);

  }


  ngOnInit(): void {
    this.surveyService.getSurveys().subscribe(surveys => this.surveys = surveys);
    this.questions=[];
  }

  onSubmit2() {

    console.log(this.productForm.value);

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
