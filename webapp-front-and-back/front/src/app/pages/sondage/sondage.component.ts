import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-sondage',
  templateUrl: './sondage.component.html',
  styleUrls: ['./sondage.component.css']
})
export class SondageComponent implements OnInit {
  selectedMood = '';
  myTextarea;
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit() {
    console.log(this.selectedMood);
    console.log(this.myTextarea);
  }
  selectChangeHandler (event: any) {
    this.selectedMood = event.target.value;
  }
  getValue(str) {
    this.myTextarea = str;
  }

}
