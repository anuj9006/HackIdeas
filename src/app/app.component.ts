import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'challenges';
  public authenticated:boolean = false;

  constructor(
    private authenticationService: AuthenticationService
    ) { }

  ngOnInit(): void {
    this.subscribeToAuthencatedUser();
  }

  private subscribeToAuthencatedUser() {
    this.authenticationService.authenticated.subscribe(data => {
      this.authenticated = data;
    });
  }

}
