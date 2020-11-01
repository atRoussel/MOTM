import {Component, OnInit} from '@angular/core';
import {defaultsDeep} from 'lodash';
import {SurveyService} from '../../services/survey.service';
import {Survey} from '../../models/survey.model';
import {Question} from '../../models/question.model';
import {QuestionService} from '../../services/question.service';

@Component({
    selector: 'app-add-survey',
    templateUrl: './add-survey.component.html',
    styleUrls: ['./add-survey.component.css']
})
export class AddSurveyComponent implements OnInit {
  // Déclaration des variables
    timer;
    surveyWaiting;
    counter = 0;
    localCounter;
    surveys: Survey[];
    questions: Question[];
    selectedId: number = null;
    selectedSurvey: Survey;
    isDisabled = false;
    questionList: string[];
    questionsSize: string[];
    newQuestion: string;

    // Fonction statique du timer de publication du sondage
    static mytime(count) {
        const interval = setInterval(() => {
            count--;
            // On stocke la valeur du timer dans le navigateur
            localStorage.setItem('surveyTimer', JSON.stringify(count));
            if (count < 0) {
                clearInterval(interval);
            }
        }, 1000);
    }

    constructor(private surveyService: SurveyService, private  questionService: QuestionService) {
    }

    ngOnInit(): void {
        // Récupération des variables stockées dans la navigateur
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
            } else {
                AddSurveyComponent.mytime(this.localCounter);
                this.isDisabled = true;
            }
        }
        // Initialisation des varaibles
        this.selectedSurvey = new Survey();
        this.questionList = [];
        this.questionsSize = [];
        this.surveyService.getSurveys().subscribe(surveys => this.surveys = surveys);
    }

    // Publier le sondage pendant que le timer s'écoule
    publishNow() {
        this.surveyWaiting = JSON.parse(localStorage.getItem('survey'));
        this.surveyService.addSurvey(this.surveyWaiting).subscribe();
        localStorage.removeItem('survey');
        localStorage.removeItem('surveyTimer');
        window.location.reload();
    }

    // Construction du sondage avec les données du html
    addSurvey(surveyTitle, surveyDesc, surveyQuestions, surveyId) {
        this.isDisabled = true;
        this.questions = [];
        const question = defaultsDeep({
            id: null,
            text: surveyQuestions,
            answers: null
        });
        this.questions.push(question)

        // Une question vide n'est pas enregistrée
        if (this.questionList.length > 0) {
            this.questionList.forEach(ques => {
                if (ques !== '') {
                    const oneMoreQuestion = defaultsDeep({
                        id: null,
                        text: ques,
                        answers: null,
                    });
                    this.questions.push(oneMoreQuestion);
                }
            });
        }

        const survey = defaultsDeep({
            id: surveyId,
            title: surveyTitle,
            description: surveyDesc,
            questions: this.questions,
            comments: null
        });

        try {
            // Stockage du sondage dans le navigateur
            localStorage.setItem('survey', JSON.stringify(survey));
            // Début du timer de publication
            AddSurveyComponent.mytime(this.counter);
            this.localCounter = this.counter;
            this.startCountdown()
        } catch (e) {
        }
    }

    // Supprimer un sondage de la bdd
    deleteSurvey(id: number) {
        this.surveyService.deleteSurvey(id).subscribe(succes => {
            this.surveys = this.surveys.filter(survey => survey.id !== id)
        });
    }

    // Remplir la liste des questions
    selectChangeHandler(event: any, index: number) {
        this.questionList[index] = event.target.value;
    }

    // Récupérer un sondage depuis le html (pour afficher son apercu)
    getSelectedSurvey(surv: Survey) {
        this.selectedSurvey = surv;
    }

    // Récupérer la valeur du timer
    selectChangeHandler2(event: any) {
        if ((event.target.value < 1) || (event.target.value === '')) {
            this.counter = 0;
        } else this.counter = event.target.value;
    }

    // Timer local
    startCountdown() {
        const interval = setInterval(() => {
            this.timer = this.counter
            this.counter--;
            if (this.counter < 0) {
                clearInterval(interval);
                window.location.reload();
            }
        }, 1000);
    }
}
