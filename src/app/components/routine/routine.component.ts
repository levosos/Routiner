import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddPhaseDialog } from '../../dialogs/add-phase/add-phase.dialog';
import { BlocksService } from '../../services/blocks/blocks.service';
import * as Blocks from '../../blocks';

@Component({
  templateUrl: './routine.component.html'
})
export class RoutineComponent {

  constructor(public blocks: BlocksService, private dialog: MatDialog) {
  }

  public async add(): Promise<void> {
    const phase: Blocks.Phase | undefined = await this.dialog.open(AddPhaseDialog).afterClosed().toPromise();

    if (phase) {
      await this.blocks.routine.add(phase);
    }
  }
}
