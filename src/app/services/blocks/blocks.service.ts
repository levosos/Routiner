import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from '../auth/auth.service';
import * as Blocks from '../../blocks';
import * as Documents from '../../documents';

@Injectable()
export class BlocksService {

  public routine: Documents.Routine | null = null;

  constructor(auth: AuthService, firestore: AngularFirestore) {
    auth.user$.subscribe(user => {
      this.routine = user
        ? new Documents.Routine(firestore.collection<Blocks.Phase>(user.uid))
        : null;
    });
  }
}
