import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  public readonly state: Observable<firebase.User | null>;

  constructor(private af: AngularFireAuth) {
    this.state = this.af.authState;
  }

  public async login(): Promise<void> {
    await this
    .af
    .auth
    .signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  public async logout(): Promise<void> {
    await this.af.auth.signOut();
  }
}
