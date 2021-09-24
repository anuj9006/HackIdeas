import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

const ids = ['123', '456', '789'];

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {  
  @Input() isLoggedIn: any;
  public loginForm: FormGroup;
  public errorMessage:String = '';
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private storage:LocalStorageService
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
    if (ids.includes(this.loginForm.controls.employeeId.value)) {
      this.errorMessage = '';
      this.authenticationService.authenticated.next(true);
      this.storage.store('userId', this.loginForm.controls.employeeId.value)
    } else {
      this.errorMessage = 'Invalid Employee Id'
      this.authenticationService.authenticated.next(false);
    }
  }
}
