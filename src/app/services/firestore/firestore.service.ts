import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../../services/auth/auth.service';
import * as Blocks from '../../blocks';
import * as Documents from '../../documents';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirestoreService {

  public readonly routine$: Observable<Documents.Routine | null>;

  constructor(private firestore: AngularFirestore, auth: AuthService) {
    this.routine$ = auth.user$.map(user => {
      if (!user) {
        return null;
      }

      const collection: AngularFirestoreCollection<Blocks.Phase> = this.firestore.collection<Blocks.Phase>(user.uid);
      const routine: Documents.Routine = new Documents.Routine(collection);

      return routine;
    });
  }
}
