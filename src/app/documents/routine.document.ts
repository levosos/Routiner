import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import * as Blocks from '../blocks';
import { Phase } from './phase.document';

export class Routine {

    public readonly phases$: Observable<Phase[]>;

    constructor(collection: AngularFirestoreCollection<Blocks.Phase>) {
      this.phases$ = collection
        .snapshotChanges()
        .map(actions => actions.map(
          action => new Phase(
            collection.doc<Blocks.Phase>(action.payload.doc.id),
            action.payload.doc.data() as Blocks.Phase
            )
          )
        );
    }
}
