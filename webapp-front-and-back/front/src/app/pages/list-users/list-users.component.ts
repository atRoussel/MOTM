import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {defaultsDeep} from 'lodash';

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
    users: User[];
    selectedId: number = null;
    modalTitle = 'Ajout d\'un utilisateur';

    constructor(private userService: UserService) {
    }

    ngOnInit() {
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
