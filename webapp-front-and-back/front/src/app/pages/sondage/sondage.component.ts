import {Component, OnInit} from '@angular/core';
import {Survey} from '../../models/survey.model';
import {SurveyService} from '../../services/survey.service';
import {defaultsDeep} from 'lodash';
import {AnswerService} from '../../services/answer.service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {CommentService} from '../../services/comment.service';
import {AddSurveyComponent} from '../add-survey/add-survey.component';

@Component({
    selector: 'app-sondage',
    templateUrl: './sondage.component.html',
    styleUrls: ['./sondage.component.css']
})
export class SondageComponent implements OnInit {
    // Déclaration des variables
    localCounter;
    surveyWaiting;
    selectedMood = '';
    myTextarea;
    surveys: Survey[];
    users: User[];
    lastSurvey: Survey;
    responseGrid: string[];
    userCo: User;
    updateId: number;
    updateAnsId: number;
    canValidate = false;
    identification = true;

    constructor(private surveyService: SurveyService, private  commentService: CommentService, private answerService: AnswerService,
                private userService: UserService, private router: Router, private _location: Location) {
    }

    ngOnInit(): void {
        // Récupération des variables stockées dans le navigateur
        this.localCounter = JSON.parse(localStorage.getItem('surveyTimer'));
        this.surveyWaiting = JSON.parse(localStorage.getItem('survey'));
        // Publication du sondage en attente
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
        // Initialisation des variables
        this.surveyService.getSurveys().subscribe(surveys => this.lastSurvey = surveys[surveys.length - 1]);
        this.userService.getUsers().subscribe(users => this.users = users);
        document.getElementById('id02').style.display = 'block';
        this.responseGrid = [];
        this.canValidate = true;
    }

    // Remplir la grille de réponse de l'utilisateur
    selectChangeHandler(event: any, index: number) {
        this.selectedMood = event.target.value;
        this.responseGrid[index] = this.selectedMood;
    }

    // Ajout du commentaire et des réponses de l'utilisateur à la bdd
    addComment(commentValue, commentSurvey) {
        this.canValidate = true;
        if (this.responseGrid.length === 0) {
            this.canValidate = false;
        }
        // Vérification des réponses
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.responseGrid.length; i++) {
            if (((this.responseGrid[i] !== '5') && (this.responseGrid[i] !== '4') && (this.responseGrid[i] !== '3') &&
                (this.responseGrid[i] !== '2') && (this.responseGrid[i] !== '1')) ||
                (this.responseGrid.length < this.lastSurvey.questions.length)) {
                this.canValidate = false;
            }
        }

        // Identification des doublons
        if (this.canValidate) {
            this.lastSurvey.comments.forEach(com => {
                this.userCo.comments.forEach(comm => {
                    if (com.id === comm.id) {
                        this.updateId = com.id
                    }
                })
            })
            const comment = defaultsDeep({
                id: this.updateId,
                value: commentValue,
                survey: commentSurvey,
                user: this.userCo,
            });
            this.commentService.addComment(comment).subscribe();

            this.lastSurvey.questions.forEach((qu, i) => {
                qu.answers.forEach(ans => {
                    this.userCo.answers.forEach(userAns => {
                        if (ans.id === userAns.id) {
                            this.updateAnsId = ans.id;
                        }
                    })
                })
                const answer = defaultsDeep({
                    id: this.updateAnsId,
                    value: this.responseGrid[i],
                    question: commentSurvey.questions[i],
                    user: this.userCo,
                })
                this.answerService.addAnswer(answer).subscribe();
            })
            document.getElementById('id01').style.display = 'block'
        }
    }

    refresh() {
        window.location.reload();
    }

    // Identification de l'utilisateur
    checkEmail(str) {
        this.users.forEach(user => {
            if (user.mail === str) {
                this.userCo = user;
                document.getElementById('id02').style.display = 'none';
                this.identification = true;
            } else {
                this.identification = false;
            }
        })
    }
}
