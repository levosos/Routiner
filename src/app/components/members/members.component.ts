import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ErrorableComponent } from '../errorable.component';

@Component({
  templateUrl: './members.component.html'
})
export class MembersComponent extends ErrorableComponent {

  constructor(private _router: Router, private _auth: AuthService) {
    super();
  }

  public async logout(): Promise<void> {
    await this.trap(async () => {
      await this._auth.logout();
      await this._router.navigateByUrl('');
    });
  }
}
