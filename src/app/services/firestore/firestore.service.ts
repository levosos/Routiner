import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../../services/auth/auth.service';
import * as Blocks from '../../blocks';
import * as Documents from '../../documents';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirestoreService {

  public readonly routine$: Observable<Documents.Routine | null>;

  private _routine: Documents.Routine | null = null;

  public get routine(): Documents.Routine | null {
    return this._routine;
  }

  constructor(private firestore: AngularFirestore, auth: AuthService) {
    this.routine$ = auth.user$.map(user => {
      this._routine = null;

      if (user !== null) {
        const collection: AngularFirestoreCollection<Blocks.Phase> = this.firestore.collection<Blocks.Phase>(user.uid);
        this._routine = new Documents.Routine(collection);
      }

      return this._routine;
    });
  }
}
