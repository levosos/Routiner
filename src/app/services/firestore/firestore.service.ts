import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../../services/auth/auth.service';
import * as Blocks from '../../blocks';
import * as Documents from '../../documents';

@Injectable()
export class FirestoreService {

  public routine: Documents.Routine | null = null;

  constructor(private firestore: AngularFirestore, auth: AuthService) {
    auth.user$.subscribe(user => {
      if (user !== null) {
        const collection: AngularFirestoreCollection<Blocks.Phase> = this.firestore.collection<Blocks.Phase>(user.uid);
        this.routine = new Documents.Routine(collection);
      } else {
        this.routine = null;
      }
    });
  }
}
