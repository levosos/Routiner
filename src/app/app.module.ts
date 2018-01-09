import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
         MatButtonModule,
         MatCardModule,
         MatListModule,
         MatIconModule,
         MatMenuModule,
         MatDialogModule,
         MatSelectModule,
         MatInputModule,
       } from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import {
         CovalentLayoutModule,
         CovalentMessageModule,
        } from '@covalent/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MembersComponent } from './components/members/members.component';

import { AddBlockDialog } from './dialogs/add-block/add-block.dialog';

import { AddBlockLearnSongForm } from './forms/add-block-learn-song/add-block-learn-song.form';
import { AddBlockTechniqueForm } from './forms/add-block-technique/add-block-technique.form';

import { AuthService } from './services/auth/auth.service';
import { BlocksService } from './services/blocks/blocks.service';

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
    AddBlockDialog,
    AddBlockLearnSongForm,
    AddBlockTechniqueForm,
  ],
  entryComponents: [
    AddBlockDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    routes,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    AngularFireModule.initializeApp(firebase, 'routiner'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    CovalentLayoutModule,
    CovalentMessageModule,
  ],
  providers: [
    AuthService,
    BlocksService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
