import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddPhaseDialog } from '../../dialogs/add-phase/add-phase.dialog';
import { FirestoreService } from '../../services/firestore/firestore.service';
import * as Blocks from '../../blocks';

@Component({
  templateUrl: './routine.component.html'
})
export class RoutineComponent {

  constructor(public firestore: FirestoreService, private dialog: MatDialog) {
  }

  public async add(): Promise<void> {
    const phase: Partial<Blocks.Phase> | undefined = await this.dialog.open(AddPhaseDialog).afterClosed().toPromise();

    if (phase) {
      await this.firestore.routine.add(phase);
    }
  }
}
