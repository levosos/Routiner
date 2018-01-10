import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import * as Blocks from '../blocks';
import { Block } from './block.document';

export class Phase {

  private readonly collection: AngularFirestoreCollection<Blocks.Block>;
  public readonly blocks$: Observable<Block[]>;

  constructor(
    private document: AngularFirestoreDocument<Blocks.Phase>,
    public data: Blocks.Phase
  ) {
    this.collection = document.collection<Blocks.Block>('blocks');

    this.blocks$ = this.collection
      .snapshotChanges()
      .map(actions => actions.map(
        action => new Block(
          this.collection.doc<Blocks.Block>(action.payload.doc.id),
          action.payload.doc.data() as Blocks.Block
          )
        )
      );
  }

  public async add(block: Blocks.Block): Promise<void> {
    await this.collection.add(block);
  }

  public async delete(): Promise<void> {
    const blocks: firebase.firestore.QuerySnapshot = await this.collection.ref.get();

    for (const block of blocks.docs) {
      await block.ref.delete();
    }

    await this.document.delete();
  }
}
