import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication/authentication.service';

describe('AppComponent', () => {
  let authenticationService: AuthenticationService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [AuthenticationService]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    authenticationService = TestBed.inject(AuthenticationService);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'challenges'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('challenges');
  });
  it(`should subscrive authenticated user`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;    
    expect(app.authenticated).toBeFalsy();
  });
});
