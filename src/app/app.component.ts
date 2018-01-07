import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private router: Router, public auth: AuthService) {
  }

  public async logout(): Promise<void> {
    await this.auth.logout();
    await this.router.navigateByUrl('');
  }
}
