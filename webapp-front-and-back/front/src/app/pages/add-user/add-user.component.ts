import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../services/user.service';
import { defaultsDeep } from 'lodash';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private _location: Location) { }

  ngOnInit() {
  }

  onSubmit(ngForm: NgForm) {

    const user = defaultsDeep({
      userId: null,
      userName: ngForm.form.value.name,
      userMail: ngForm.form.value.mail,
      userDate: ngForm.form.value.date
    });

    // tslint:disable-next-line:no-shadowed-variable
    this.userService.addUser(user).subscribe(user => console.log(user));
    this._location.back()
  }
}
