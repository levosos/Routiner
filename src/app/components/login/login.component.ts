import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ErrorableComponent } from '../errorable/errorable.component';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent extends ErrorableComponent implements OnInit {

  constructor(private _router: Router, private _auth: AuthService) {
    super();
  }

  async ngOnInit(): Promise<void> {
    if (await this._auth.isLoggedIn()) {
      await this._navigate();
    }
  }

  public async loginFacebook(): Promise<void> {
    await this.trap(async () => {
      await this._auth.loginFacebook();
      await this._navigate();
    });
  }

  public async loginGoogle(): Promise<void> {
    await this.trap(async () => {
      await this._auth.loginGoogle();
      await this._navigate();
    });
  }

  private async _navigate(): Promise<void> {
    await this.trap(async () => {
      if (!await this._router.navigateByUrl('/practice')) {
        throw Error('Failed redirecting to \'/practice\'');
      }
    });
  }
}
