import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import * as utils from '../../utils';

@Injectable()
export class AuthService {

  public readonly user$: Observable<firebase.User | null>;

  constructor(private _af: AngularFireAuth) {
    this.user$ = this._af.authState;
  }

  public async loginGoogle(): Promise<void> {
    await this
    ._af
    .auth
    .signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  public async loginFacebook(): Promise<void> {
    await this
    ._af
    .auth
    .signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }

  public async logout(): Promise<void> {
    await this._af.auth.signOut();
  }

  public async isLoggedIn(): Promise<boolean> {
    const promise: Promise<firebase.User | null> = new Promise(resolve => {
      this.user$.subscribe(x => resolve(x));
    });

    const user: firebase.User | null = await promise;
    return user !== null;
  }
}
