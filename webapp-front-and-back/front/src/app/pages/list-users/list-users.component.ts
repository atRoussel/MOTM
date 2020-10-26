import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {NgForm} from '@angular/forms';
import { defaultsDeep } from 'lodash';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  users: User[];
  newName;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(succes => {
      this.users = this.users.filter(user => user.id !== id)
    });
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
    window.location.reload();
  }
}
