import { TestBed, inject } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../../services/auth/auth.service';
import * as MockAngularFireAuth from '../../mocks/angularfireauth.mock.service';
import * as MockRouter from '../../mocks/router.mock.service';
import * as utils from '../../utils/utils';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        AuthService,
        { provide: AngularFireAuth, useClass: MockAngularFireAuth.AngularFireAuth },
        { provide: Router, useClass: MockRouter.Router }
      ]
    });
  });

  it('should be created', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  describe('logged', () => {
    it('sanity', inject([AuthGuard, AngularFireAuth], async (guard: AuthGuard, af: MockAngularFireAuth.AngularFireAuth) => {
      af.__authState_logged = true;

      const can = await guard.canActivate();
      expect(can).toBeTruthy();
    }));

    it('not redirected', inject([AuthGuard, AngularFireAuth, Router], async (
        guard: AuthGuard,
        af: MockAngularFireAuth.AngularFireAuth,
        router: MockRouter.Router
      ) => {
      af.__authState_logged = true;

      await guard.canActivate();

      expect(router.__url).toBeUndefined();
    }));
  });

  describe('not logged', () => {
    it('sanity', inject([AuthGuard, AngularFireAuth], async (guard: AuthGuard, af: MockAngularFireAuth.AngularFireAuth) => {
      af.__authState_logged = false;

      const can = await guard.canActivate();
      expect(can).toBeFalsy();
    }));

    it('redirected', inject([AuthGuard, AngularFireAuth, Router], async (
        guard: AuthGuard,
        af: MockAngularFireAuth.AngularFireAuth,
        router: MockRouter.Router
      ) => {
      af.__authState_logged = false;

      await guard.canActivate();
      await utils.delay(1000); // redirecting is asynchronous

      expect(router.__url).toEqual('/login');
    }));
  });
});
