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
import { RoutineComponent } from './components/routine/routine.component';
import { BlockComponent } from './components/block/block.component';
import { PhaseComponent } from './components/phase/phase.component';

import { AddBlockDialog } from './dialogs/add-block/add-block.dialog';
import { EditBlockDialog } from './dialogs/edit-block/edit-block.dialog';
import { AddPhaseDialog } from './dialogs/add-phase/add-phase.dialog';
import { EditPhaseDialog } from './dialogs/edit-phase/edit-phase.dialog';

import { BlockLearnSongForm } from './forms/block-learn-song/block-learn-song.form';
import { BlockTechniqueForm } from './forms/block-technique/block-technique.form';
import { PhaseForm } from './forms/phase/phase.form';

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
    RoutineComponent,
    BlockComponent,
    PhaseComponent,
    AddBlockDialog,
    EditBlockDialog,
    AddPhaseDialog,
    EditPhaseDialog,
    BlockLearnSongForm,
    BlockTechniqueForm,
    PhaseForm,
  ],
  entryComponents: [
    AddBlockDialog,
    EditBlockDialog,
    AddPhaseDialog,
    EditPhaseDialog,
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
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
