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
      id: null,
      name: ngForm.form.value.name,
      mail: ngForm.form.value.mail,
      date: ngForm.form.value.date
    });

    // tslint:disable-next-line:no-shadowed-variable
    this.userService.addUser(user).subscribe(user => console.log(user));
    this._location.back()
  }
}
