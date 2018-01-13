import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AddPhaseDialog } from '../../dialogs/add-phase/add-phase.dialog';
import { AuthService } from '../../services/auth/auth.service';
import * as Blocks from '../../blocks';
import * as Documents from '../../documents';

@Component({
  templateUrl: './routine.component.html'
})
export class RoutineComponent implements OnInit {

  public routine: Documents.Routine;

  constructor(private firestore: AngularFirestore, private auth: AuthService, private dialog: MatDialog) {
  }

  async ngOnInit(): Promise<void> {
    const user: firebase.User = await this.auth.getLoggedInUser();
    const collection: AngularFirestoreCollection<Blocks.Phase> = this.firestore.collection<Blocks.Phase>(user.uid);

    this.routine = new Documents.Routine(collection);
  }

  public async add(): Promise<void> {
    const phase: Blocks.Phase | undefined = await this.dialog.open(AddPhaseDialog).afterClosed().toPromise();

    if (phase) {
      await this.routine.add(phase);
    }
  }
}
