import { $it } from 'jasmine-ts-async';
import { TestBed, inject } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import * as MockAngularFireAuth from '../../mocks/angularfireauth.mock.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, { provide: AngularFireAuth, useClass: MockAngularFireAuth.AngularFireAuth }]
    });
  });

  it('should be created', inject([AuthService, AngularFireAuth], (service: AuthService, mock: MockAngularFireAuth.AngularFireAuth) => {
    expect(service).toBeTruthy();
    expect(service.user$).toEqual(mock.authState);
  }));

  describe('loginFacebook()', () => {
    $it('provider', inject([AuthService, AngularFireAuth], async (service: AuthService, mock: MockAngularFireAuth.AngularFireAuth) => {
      mock.auth.__signInWithPopup_test = MockAngularFireAuth.signInWithPopup_Test.Provider;

      await service.loginFacebook();
      expect(mock.auth.__signInWithPopup_provider instanceof firebase.auth.FacebookAuthProvider).toBeTruthy();
    }));

    $it('await', inject([AuthService, AngularFireAuth], async (service: AuthService, mock: MockAngularFireAuth.AngularFireAuth) => {
      mock.auth.__signInWithPopup_test = MockAngularFireAuth.signInWithPopup_Test.Await;

      const before = Date.now();
      await service.loginFacebook();
      const after = Date.now();

      const duration = after - before;

      const ms = 2000;
      expect(duration).toBeGreaterThanOrEqual(ms);
      expect(duration).toBeLessThanOrEqual(ms + 20);
    }));

    $it('error', inject([AuthService, AngularFireAuth], async (service: AuthService, mock: MockAngularFireAuth.AngularFireAuth) => {
      mock.auth.__signInWithPopup_test = MockAngularFireAuth.signInWithPopup_Test.Error;

      let error: Error;

      try {
        await service.loginFacebook();
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
    }));
  });

  describe('loginGoogle()', () => {
    $it('provider', inject([AuthService, AngularFireAuth], async (service: AuthService, mock: MockAngularFireAuth.AngularFireAuth) => {
      mock.auth.__signInWithPopup_test = MockAngularFireAuth.signInWithPopup_Test.Provider;

      await service.loginGoogle();
      expect(mock.auth.__signInWithPopup_provider instanceof firebase.auth.GoogleAuthProvider).toBeTruthy();
    }));

    $it('await', inject([AuthService, AngularFireAuth], async (service: AuthService, mock: MockAngularFireAuth.AngularFireAuth) => {
      mock.auth.__signInWithPopup_test = MockAngularFireAuth.signInWithPopup_Test.Await;

      const before = Date.now();
      await service.loginGoogle();
      const after = Date.now();

      const duration = after - before;

      const ms = 2000;
      expect(duration).toBeGreaterThanOrEqual(ms);
      expect(duration).toBeLessThanOrEqual(ms + 20);
    }));

    $it('error', inject([AuthService, AngularFireAuth], async (service: AuthService, mock: MockAngularFireAuth.AngularFireAuth) => {
      mock.auth.__signInWithPopup_test = MockAngularFireAuth.signInWithPopup_Test.Error;

      let error: Error;

      try {
        await service.loginGoogle();
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
    }));
  });

  describe('logout()', () => {
    $it('sanity', inject([AuthService, AngularFireAuth], async (service: AuthService, mock: MockAngularFireAuth.AngularFireAuth) => {
      mock.auth.__signOut_test = MockAngularFireAuth.signOut_Test.Sanity;

      await service.logout();
      expect(mock.auth.__signOut_called).toBeTruthy();
    }));

    $it('await', inject([AuthService, AngularFireAuth], async (service: AuthService, mock: MockAngularFireAuth.AngularFireAuth) => {
      mock.auth.__signOut_test = MockAngularFireAuth.signOut_Test.Await;

      const before = Date.now();
      await service.logout();
      const after = Date.now();

      const duration = after - before;

      const ms = 2000;
      expect(duration).toBeGreaterThanOrEqual(ms);
      expect(duration).toBeLessThanOrEqual(ms + 20);
    }));

    $it('error', inject([AuthService, AngularFireAuth], async (service: AuthService, mock: MockAngularFireAuth.AngularFireAuth) => {
      mock.auth.__signOut_test = MockAngularFireAuth.signOut_Test.Error;

      let error: Error;

      try {
        await service.logout();
      } catch (e) {
        error = e;
      }

      expect(error).toBeDefined();
    }));
  });

  describe('isLoggedIn()', () => {
    $it('logged in', inject([AuthService, AngularFireAuth], async (service: AuthService, mock: MockAngularFireAuth.AngularFireAuth) => {
      mock.__authState_logged = true;
      const logged: boolean = await service.isLoggedIn();
      expect(logged).toBeTruthy();
    }));

    $it('not logged in', inject([AuthService, AngularFireAuth], async (service: AuthService, mock: MockAngularFireAuth.AngularFireAuth) => {
      mock.__authState_logged = false;
      const logged: boolean = await service.isLoggedIn();
      expect(logged).toBeFalsy();
    }));
  });
});
