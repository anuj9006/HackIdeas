import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { RestService } from 'src/app/services/rest/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {  
  @Input() isLoggedIn: any;
  public loginForm: FormGroup;
  public errorMessage:String = '';
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private restService: RestService
  ) { } 
  
  ngOnInit(): void {
    this.addFormControls();
  }

  private addFormControls() {
    this.loginForm = this.formBuilder.group({
      employeeId: ['', [Validators.pattern('^[a-zA-Z0-9-]+$')]],
    });
  }

  public login() {
    this.restService.post('/login',{ userId: this.loginForm.controls.employeeId.value }).subscribe(data => {
      this.errorMessage = '';
      this.authenticationService.authenticated.next(true);
      sessionStorage.setItem('userId', this.loginForm.controls.employeeId.value);
      sessionStorage.setItem('token', 'Bearer ' + data.token);
    }, error => {
      this.errorMessage = error.error.message;
      this.authenticationService.authenticated.next(false);
      this.loginForm.reset();
    });
  }
}
