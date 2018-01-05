import { $it } from 'jasmine-ts-async';
import { inject, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import * as MockRouter from '../../mocks/router.mock.service';
import * as MockAngularFireAuth from '../../mocks/angularfireauth.mock.service';
import { AuthService } from '../../services/auth/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        AuthService,
        { provide: AngularFireAuth, useClass: MockAngularFireAuth.AngularFireAuth },
        { provide: Router, useClass: MockRouter.Router }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    describe('logged', () => {
      $it('redirects', inject([AngularFireAuth, Router], async (af: MockAngularFireAuth.AngularFireAuth, router: MockRouter.Router) => {
        af.__authState_logged = true;
        router.__test = MockRouter.Test.Sanity;

        await component.ngOnInit();
        expect(router.__url).toEqual('/members');
      }));

      $it('await', inject([AngularFireAuth, Router], async (af: MockAngularFireAuth.AngularFireAuth, router: MockRouter.Router) => {
        af.__authState_logged = true;
        router.__test = MockRouter.Test.Await;

        const before = Date.now();
        await component.ngOnInit();
        const after = Date.now();

        const duration = after - before;

        const ms = 2000;
        expect(duration).toBeGreaterThanOrEqual(ms);
        expect(duration).toBeLessThanOrEqual(ms + 20);
      }));

      $it('error', inject([AngularFireAuth, Router], async (af: MockAngularFireAuth.AngularFireAuth, router: MockRouter.Router) => {
        af.__authState_logged = true;
        router.__test = MockRouter.Test.Error;

        await component.ngOnInit();

        expect(component.error).toBeDefined();
      }));

      $it('fail', inject([AngularFireAuth, Router], async (af: MockAngularFireAuth.AngularFireAuth, router: MockRouter.Router) => {
        af.__authState_logged = true;
        router.__test = MockRouter.Test.Fail;

        await component.ngOnInit();

        expect(component.error).toBeDefined();
      }));
    });

    describe('not logged', () => {
      $it('not redirects', inject([AngularFireAuth, Router], async (af: MockAngularFireAuth.AngularFireAuth, router: MockRouter.Router) => {
        af.__authState_logged = false;
        router.__test = MockRouter.Test.Sanity;

        await component.ngOnInit();
        expect(router.__url).toBeUndefined();
      }));
    });
  });

  describe('loginFacebook()', () => {
    $it('provider', inject([AngularFireAuth], async (af: MockAngularFireAuth.AngularFireAuth) => {
      af.auth.__signInWithPopup_test = MockAngularFireAuth.signInWithPopup_Test.Provider;

      await component.loginFacebook();
      expect(af.auth.__signInWithPopup_provider instanceof firebase.auth.FacebookAuthProvider).toBeTruthy();
    }));

    $it('await', inject([AngularFireAuth], async (af: MockAngularFireAuth.AngularFireAuth) => {
      af.auth.__signInWithPopup_test = MockAngularFireAuth.signInWithPopup_Test.Await;

      const before = Date.now();
      await component.loginFacebook();
      const after = Date.now();

      const duration = after - before;

      const ms = 2000;
      expect(duration).toBeGreaterThanOrEqual(ms);
      expect(duration).toBeLessThanOrEqual(ms + 20);
    }));

    $it('error', inject([AngularFireAuth], async (af: MockAngularFireAuth.AngularFireAuth) => {
      af.auth.__signInWithPopup_test = MockAngularFireAuth.signInWithPopup_Test.Error;

      await component.loginFacebook();

      expect(component.error).toBeDefined();
    }));
  });

  describe('loginGoogle()', () => {
    $it('provider', inject([AngularFireAuth], async (af: MockAngularFireAuth.AngularFireAuth) => {
      af.auth.__signInWithPopup_test = MockAngularFireAuth.signInWithPopup_Test.Provider;

      await component.loginGoogle();
      expect(af.auth.__signInWithPopup_provider instanceof firebase.auth.GoogleAuthProvider).toBeTruthy();
    }));

    $it('await', inject([AngularFireAuth], async (af: MockAngularFireAuth.AngularFireAuth) => {
      af.auth.__signInWithPopup_test = MockAngularFireAuth.signInWithPopup_Test.Await;

      const before = Date.now();
      await component.loginGoogle();
      const after = Date.now();

      const duration = after - before;

      const ms = 2000;
      expect(duration).toBeGreaterThanOrEqual(ms);
      expect(duration).toBeLessThanOrEqual(ms + 20);
    }));

    $it('error', inject([AngularFireAuth], async (af: MockAngularFireAuth.AngularFireAuth) => {
      af.auth.__signInWithPopup_test = MockAngularFireAuth.signInWithPopup_Test.Error;

      await component.loginGoogle();

      expect(component.error).toBeDefined();
    }));
  });
});
