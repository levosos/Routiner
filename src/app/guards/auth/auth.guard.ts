import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router, private _auth: AuthService) {
  }

  async canActivate(): Promise<boolean> {
    const authenticated: boolean = await this._auth.isLoggedIn();

    if (!authenticated) {
      // cannot 'await' because it blocks the function
      this._router.navigateByUrl('/login');
    }

    return authenticated;
  }
}
