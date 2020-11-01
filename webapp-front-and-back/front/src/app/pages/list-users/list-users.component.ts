import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {defaultsDeep} from 'lodash';
import {AddSurveyComponent} from '../add-survey/add-survey.component';
import {SurveyService} from '../../services/survey.service';

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
    // Déclaration des variables
    localCounter;
    surveyWaiting;
    users: User[];
    selectedId: number = null;
    modalTitle = 'Ajout d\'un utilisateur';

    constructor(private userService: UserService, private surveyService: SurveyService) {
    }

    ngOnInit() {
        // Récupération des variables stockées dans le navigateur
        this.localCounter = JSON.parse(localStorage.getItem('surveyTimer'));
        this.surveyWaiting = JSON.parse(localStorage.getItem('survey'));
        // Publication du sondage en attente dans la bdd
        if ((this.localCounter !== undefined) && (this.localCounter !== null)) {
            if (this.localCounter < 1) {
                if ((this.surveyWaiting !== undefined) && (this.localCounter < 1) && (this.surveyWaiting !== null)) {
                    this.surveyService.addSurvey(this.surveyWaiting).subscribe();
                    localStorage.removeItem('survey');
                    localStorage.removeItem('surveyTimer');
                    window.location.reload();
                }
            } else AddSurveyComponent.mytime(this.localCounter);
        }
        this.userService.getUsers().subscribe(users => this.users = users);
    }

    // Ajouter un utilisateur dans la bdd
    addUser(userName, userMail, userDate, userId) {
        const user = defaultsDeep({
            id: userId,
            name: userName,
            mail: userMail,
            date: userDate
        });
        this.userService.addUser(user).subscribe();
        window.location.reload();
    }

    // Supprimer un utilisateur de la bdd
    deleteUser(id: number) {
        this.userService.deleteUser(id).subscribe(succes => {
            this.users = this.users.filter(user => user.id !== id)
        });
    }
}
