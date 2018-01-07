import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import * as utils from '../../utils/utils';

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
    return await this.snapLoggedInUser() !== null;
  }

  public async getLoggedInUser(): Promise<firebase.User> {
    const user = await this.snapLoggedInUser();

    if (user === null) {
      throw Error('Not logged in');
    }

    return user;
  }

  private async snapLoggedInUser(): Promise<firebase.User | null> {
    const promise: Promise<firebase.User | null> = new Promise(resolve => {
      this.user$.subscribe(x => resolve(x));
    });

    const auth = await promise;
    return auth;
  }
}
