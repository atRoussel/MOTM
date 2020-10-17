import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListUsersComponent} from './pages/list-users/list-users.component';
import {AddUserComponent} from './pages/add-user/add-user.component';
import {StatisticsComponent} from './pages/statistics/statistics.component';
import {SondageComponent} from './pages/sondage/sondage.component';
import {AddSurveyComponent} from './pages/add-survey/add-survey.component';


const routes: Routes = [
  { path: '', component: SondageComponent },
  { path: 'user-list', component: ListUsersComponent },
  { path: 'list', component: ListUsersComponent },
  { path: 'add-user', component: AddUserComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'add-survey', component: AddSurveyComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
