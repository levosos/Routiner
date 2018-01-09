import { $it } from 'jasmine-ts-async';
import { inject, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as MockRouter from '../../mocks/router.mock.service';
import * as MockAngularFireAuth from '../../mocks/angularfireauth.mock.service';
import { AuthService } from '../../services/auth/auth.service';
import { RoutineComponent } from './routine.component';

describe('RoutineComponent', () => {
  let component: RoutineComponent;
  let fixture: ComponentFixture<RoutineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoutineComponent ],
      providers: [
        AuthService,
        { provide: AngularFireAuth, useClass: MockAngularFireAuth.AngularFireAuth },
        { provide: Router, useClass: MockRouter.Router }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('logout()', () => {
    describe('AuthService', () => {
      $it('sanity', inject([AngularFireAuth], async (af: MockAngularFireAuth.AngularFireAuth) => {
        af.auth.__signOut_test = MockAngularFireAuth.signOut_Test.Sanity;

        await component.logout();
        expect(af.auth.__signOut_called).toBeTruthy();
      }));

      $it('await', inject([AngularFireAuth], async (af: MockAngularFireAuth.AngularFireAuth) => {
        af.auth.__signOut_test = MockAngularFireAuth.signOut_Test.Await;

        const before = Date.now();
        await component.logout();
        const after = Date.now();

        const duration = after - before;

        const ms = 2000;
        expect(duration).toBeGreaterThanOrEqual(ms);
        expect(duration).toBeLessThanOrEqual(ms + 20);
      }));

      $it('error', inject([AngularFireAuth], async (af: MockAngularFireAuth.AngularFireAuth) => {
        af.auth.__signOut_test = MockAngularFireAuth.signOut_Test.Error;

        await component.logout();

        expect(component.error).toBeDefined();
      }));
    });

    describe('Router', () => {
      $it('sanity', inject([Router], async (router: MockRouter.Router) => {
        router.__test = MockRouter.Test.Sanity;

        await component.logout();
        expect(router.__url).toEqual('');
      }));

      $it('await', inject([Router], async (router: MockRouter.Router) => {
        router.__test = MockRouter.Test.Await;

        const before = Date.now();
        await component.logout();
        const after = Date.now();

        const duration = after - before;

        const ms = 2000;
        expect(duration).toBeGreaterThanOrEqual(ms);
        expect(duration).toBeLessThanOrEqual(ms + 20);
      }));

      $it('error', inject([Router], async (router: MockRouter.Router) => {
        router.__test = MockRouter.Test.Error;

        await component.logout();

        expect(component.error).toBeDefined();
      }));

      $it('fail', inject([Router], async (router: MockRouter.Router) => {
        router.__test = MockRouter.Test.Fail;

        await component.logout();

        expect(component.error).toBeDefined();
      }));
    });
  });
});
