import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddBlockDialog } from '../../dialogs/add-block/add-block.dialog';
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

    if (block !== undefined) {
      await this.phase.add(block);
    }
  }

  public async onDelete(): Promise<void> {
    await this.phase.delete();
  }
}
