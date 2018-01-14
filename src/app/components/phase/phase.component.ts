import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddBlockDialog } from '../../dialogs/add-block/add-block.dialog';
import { EditPhaseDialog } from '../../dialogs/edit-phase/edit-phase.dialog';
import * as Blocks from '../../blocks';
import * as Documents from '../../documents';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html'
})
export class PhaseComponent {
  @Input()
  public phase: Documents.Phase;

  constructor(private dialog: MatDialog) {
  }

  public async add(): Promise<void> {
    const block: Blocks.Block | undefined = await this.dialog.open(AddBlockDialog).afterClosed().toPromise();

    if (block) {
      await this.phase.add(block);
    }
  }

  public async onEdit(): Promise<void> {
    const phase: Partial<Blocks.Phase> | undefined =
      await this.dialog.open(EditPhaseDialog, { data: this.phase.data }).afterClosed().toPromise();

    if (phase) {
      await this.phase.update(phase);
    }
  }

  public async onDelete(): Promise<void> {
    await this.phase.delete();
  }
}
