import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth/auth.service';
import * as Blocks from '../../blocks';

@Injectable()
export class BlocksService {

  private collection: AngularFirestoreCollection<Blocks.Block> | null = null;
  public blocks$: Observable<Blocks.Document[]> | null = null;

  constructor(auth: AuthService, firestore: AngularFirestore) {
    auth.user$.subscribe(user => {
      if (user) {
        this.collection = firestore.collection<Blocks.Block>(user.uid);
        this.blocks$ = this.collection.snapshotChanges().map(actions => {
          return actions.map(action => {
            const id: string = action.payload.doc.id;
            const data: Blocks.Block = action.payload.doc.data() as Blocks.Block;

            return { id, ...data } as Blocks.Document;
          });
        });
      } else {
        this.collection = this.blocks$ = null;
      }
    });
  }

  public async add(block: Blocks.Block): Promise<void> {
    await this.collection.add(Object.assign({}, block));
  }

  public async delete(block: Blocks.Document): Promise<void> {
    await this.collection.doc(block.id).delete();
  }
}
