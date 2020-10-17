import { Component, OnInit } from '@angular/core';
import {newArray} from '@angular/compiler/src/util';
import {NgForm} from '@angular/forms';
import { defaultsDeep } from 'lodash';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})
export class AddSurveyComponent implements OnInit {
  questionList = newArray(1);
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(ngForm: NgForm) {
    console.log(ngForm);
    const user = defaultsDeep({
      id: null,
      firstName: ngForm.form.value.firstName,
      lastName: ngForm.form.value.lastName,
      age: ngForm.form.value.age,
    });
    console.log(ngForm.form.value.titre);
    console.log(ngForm.form.value.question);
  }
  addQuestion() {
    this.questionList.push(1);
  }
}
