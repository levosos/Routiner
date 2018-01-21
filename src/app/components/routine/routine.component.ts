import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddPhaseDialog } from '../../dialogs/add-phase/add-phase.dialog';
import { RoutineService } from '../../services/routine/routine.service';
import * as Blocks from '../../blocks';
import * as Documents from '../../documents';

@Component({
  templateUrl: './routine.component.html'
})
export class RoutineComponent {

  private routine: Documents.Routine;

  constructor(routine: RoutineService, private dialog: MatDialog) {
    routine.routine$.subscribe(r => this.routine = r);
  }

  public async add(): Promise<void> {
    const phase: Partial<Blocks.Phase> | undefined = await this.dialog.open(AddPhaseDialog).afterClosed().toPromise();

    if (phase) {
      await this.routine.add(phase);
    }
  }
}
