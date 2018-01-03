import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
         MatButtonModule,
         MatCardModule,
         MatListModule,
         MatIconModule,
       } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CovalentLayoutModule } from '@covalent/core';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    AngularFireModule.initializeApp(firebase, 'routiner'),
    AngularFireAuthModule,
    CovalentLayoutModule,
  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
