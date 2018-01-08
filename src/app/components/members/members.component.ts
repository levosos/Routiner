import { Component } from '@angular/core';
import { BlocksService } from '../../services/blocks/blocks.service';
import { ErrorableComponent } from '../errorable.component';
import * as Blocks from '../../blocks';

@Component({
  templateUrl: './members.component.html'
})
export class MembersComponent extends ErrorableComponent {

  constructor(public blocks: BlocksService) {
    super();
  }

  public async add(): Promise<void> {
    await this.trap(async () => {
      const block: Blocks.PlaySong = new Blocks.PlaySong('Soul to Squeeze', 'Red Hot Chili Peppers');
      await this.blocks.add(block);
    }, 'Failed adding');
  }

  public async delete(document: Blocks.Document): Promise<void> {
    await this.trap(async () => {
      await this.blocks.delete(document);
    }, 'Failed deleting');
  }
}
