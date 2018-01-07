import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import {
         MatButtonModule,
         MatCardModule,
         MatListModule,
         MatIconModule,
         MatMenuModule,
       } from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { CovalentLayoutModule } from '@covalent/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MembersComponent } from './components/members/members.component';

import { AuthService } from './services/auth/auth.service';

import { AuthGuard } from './guards/auth/auth.guard';

import { routes } from './app.router';

const firebase = {
  apiKey: 'AIzaSyDn8LUHqBwJwXg97xHLYewhCnEYuZlAAFI',
  authDomain: 'routiner-app.firebaseapp.com',
  databaseURL: 'https://routiner-app.firebaseio.com',
  projectId: 'routiner-app',
  storageBucket: 'routiner-app.appspot.com',
  messagingSenderId: '20612972512'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MembersComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routes,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    AngularFireModule.initializeApp(firebase, 'routiner'),
    AngularFireAuthModule,
    CovalentLayoutModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
