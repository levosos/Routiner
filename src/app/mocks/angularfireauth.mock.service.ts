import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import * as utils from '../utils/utils';

export enum signInWithPopup_Test {
    Provider,
    Await,
    Error,
}

export enum signOut_Test {
    Sanity,
    Await,
    Error,
}

class Auth {

    public __signInWithPopup_test: signInWithPopup_Test;
    public __signInWithPopup_provider: firebase.auth.AuthProvider;

    public __signOut_test: signOut_Test;
    public __signOut_called: boolean;

    async signInWithPopup(provider: firebase.auth.AuthProvider): Promise<any> {
        if (this.__signInWithPopup_test === signInWithPopup_Test.Provider) {
            this.__signInWithPopup_provider = provider;
        } else if (this.__signInWithPopup_test === signInWithPopup_Test.Await) {
            await utils.delay(2000);
        } else if (this.__signInWithPopup_test === signInWithPopup_Test.Error) {
            throw Error();
        }
    }

    async signOut(): Promise<any> {
        if (this.__signOut_test === signOut_Test.Sanity) {
            this.__signOut_called = true;
        } else if (this.__signOut_test === signOut_Test.Await) {
            await utils.delay(2000);
        } else if (this.__signOut_test === signOut_Test.Error) {
            throw Error();
        }
    }
}

@Injectable()
export class AngularFireAuth {

    public __authState_logged: boolean;
    public readonly authState = new Observable<firebase.User | null>((observer) => {
        observer.next(this.__authState_logged ? <firebase.User>(new Object()) : null);
        observer.complete();
    });
    public readonly auth = new Auth();
}
