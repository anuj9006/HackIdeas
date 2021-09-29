import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'challenges';
  public authenticated: boolean = false;
  subscriptions: any = [];

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.subscribeToAuthencatedUser();
    this.clearSessionStorage();
  }
  private clearSessionStorage() {
    window.onunload = function () {
      sessionStorage.clear();
    }
  }

  private subscribeToAuthencatedUser() {
    this.subscriptions[this.subscriptions.length] = this.authenticationService.authenticated.subscribe(data => {
      this.authenticated = data;
    });
  }
}
