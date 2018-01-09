import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BlocksService } from '../../services/blocks/blocks.service';
import { ErrorableComponent } from '../errorable/errorable.component';
import { AddBlockDialog } from '../../dialogs/add-block/add-block.dialog';
import * as Blocks from '../../blocks';

@Component({
  templateUrl: './routine.component.html'
})
export class RoutineComponent extends ErrorableComponent {
  public Blocks = Blocks;

  constructor(public blocks: BlocksService, private dialog: MatDialog) {
    super();
  }

  public async add(): Promise<void> {
    await this.trap(async () => {
      await this.dialog.open(AddBlockDialog).afterClosed().toPromise();
    }, 'Failed adding');
  }

  public async delete(document: Blocks.Document): Promise<void> {
    await this.trap(async () => {
      await this.blocks.delete(document);
    }, 'Failed deleting');
  }
}
