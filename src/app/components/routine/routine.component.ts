import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddPhaseDialog } from '../../dialogs/add-phase/add-phase.dialog';
import { FirestoreService } from '../../services/firestore/firestore.service';
import * as Blocks from '../../blocks';
import * as Documents from '../../documents';

@Component({
  templateUrl: './routine.component.html'
})
export class RoutineComponent {

  private routine: Documents.Routine;

  constructor(firestore: FirestoreService, private dialog: MatDialog) {
    firestore.routine$.subscribe(routine => this.routine = routine);
  }

  public async add(): Promise<void> {
    const phase: Partial<Blocks.Phase> | undefined = await this.dialog.open(AddPhaseDialog).afterClosed().toPromise();

    if (phase) {
      await this.routine.add(phase);
    }
  }
}
