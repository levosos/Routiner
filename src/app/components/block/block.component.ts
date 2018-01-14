import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditBlockDialog } from '../../dialogs/edit-block/edit-block.dialog';
import * as Blocks from '../../blocks';
import * as Documents from '../../documents';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent {
  public Blocks = Blocks;

  @Input()
  public block: Documents.Block;

  constructor(private dialog: MatDialog) {
  }

  public async onEdit(): Promise<void> {
    const block: Blocks.Block | undefined = await this.dialog.open(EditBlockDialog, { data: this.block.data }).afterClosed().toPromise();

    if (block) {
      await this.block.update(block);
    }
  }

  public async onDelete(): Promise<void> {
    await this.block.delete();
  }
}
