import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { SondageComponent } from './pages/sondage/sondage.component';
import { AddSurveyComponent } from './pages/add-survey/add-survey.component';

@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    StatisticsComponent,
    SondageComponent,
    AddSurveyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
