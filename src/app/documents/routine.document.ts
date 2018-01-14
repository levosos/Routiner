import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import * as Blocks from '../blocks';
import { Phase } from './phase.document';
import * as _ from 'lodash';
export class Routine {

  public readonly phases$: Observable<Phase[]>;

  constructor(private collection: AngularFirestoreCollection<Blocks.Phase>) {
    this.phases$ = collection
      .snapshotChanges()
      .map(actions => _.orderBy(actions.map(
        action => new Phase(
          collection.doc<Blocks.Phase>(action.payload.doc.id),
          action.payload.doc.data() as Blocks.Phase
          )
        ), ['data.index'])
      );
  }

  public async add(phase: Partial<Blocks.Phase>): Promise<void> {
    const snapshot: firebase.firestore.QuerySnapshot = await this.collection.ref.orderBy('index', 'desc').limit(1).get();

    let index: number;
    if (snapshot.size !== 0) {
      index = (snapshot.docs[0].data() as Blocks.Phase).index + 1;
    } else {
      index = 1;
    }

    await this.collection.add({ index: index, ...phase } as Blocks.Phase);
  }
}
