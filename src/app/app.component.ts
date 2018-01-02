import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public user: firebase.User;

  constructor(private auth: AuthService) {
    auth.state.subscribe(
      user => { this.user = user; }
    );
  }

  public async login(): Promise<void> {
    try {
      await this.auth.login();
    } catch (e) {
      console.error(e);
    }
  }

  public async logout(): Promise<void> {
    try {
      await this.auth.logout();
    } catch (e) {
      console.error(e);
    }
  }
}
