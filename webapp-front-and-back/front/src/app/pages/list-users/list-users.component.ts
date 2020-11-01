import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {NgForm} from '@angular/forms';
import { defaultsDeep } from 'lodash';
import {AddSurveyComponent} from '../add-survey/add-survey.component';
import {SurveyService} from '../../services/survey.service';

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  localCounter;
  surveyWaiting;
  users: User[];
  selectedId: number = null;
  modalTitle = 'Ajout d\'un utilisateur';

  constructor(private userService: UserService, private surveyService: SurveyService) { }

  ngOnInit() {
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
    this.userService.getUsers().subscribe(users => this.users = users);
  }

    addUser(userName, userMail, userDate, userId) {
        const user = defaultsDeep({
            id: userId,
            name: userName,
            mail: userMail,
            date: userDate
        });

        // tslint:disable-next-line:no-shadowed-variable
        this.userService.addUser(user).subscribe(user => console.log(user));
        window.location.reload();
    }

    deleteUser(id: number) {
        this.userService.deleteUser(id).subscribe(succes => {
            this.users = this.users.filter(user => user.id !== id)
        });
    }
}
