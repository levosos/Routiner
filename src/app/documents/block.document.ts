import { AngularFirestoreDocument } from 'angularfire2/firestore';
import * as Blocks from '../blocks';

export class Block {
    constructor(
      private document: AngularFirestoreDocument<Blocks.Block>,
      public data: Blocks.Block
    ) {}

  public async update(block: Blocks.Block): Promise<void> {
    await this.document.update(block);
  }

  public async delete(): Promise<void> {
    await this.document.delete();
  }
}
