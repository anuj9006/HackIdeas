import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxWebstorageModule, SessionStorageService } from 'ngx-webstorage';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddChallengeFormComponent } from './forms/add-challenge/add-challenge-form/add-challenge-form.component';
import { ChallengeListComponent } from './components/challenge-list/challenge-list.component';
import { ChallengeComponent } from './components/challenge/challenge/challenge.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    NavbarComponent,
    AddChallengeFormComponent,
    ChallengeListComponent,
    ChallengeComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    SessionStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
