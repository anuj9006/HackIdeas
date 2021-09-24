import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-webstorage';
import { AddChallengeFormComponent } from 'src/app/forms/add-challenge/add-challenge-form/add-challenge-form.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private modalRef: NgbModalRef;
  constructor(
    private authenticationService: AuthenticationService,
    private storage: LocalStorageService,
    private modalService: NgbModal    
  ) { }

  ngOnInit(): void {
  }

  public logout() {
    this.storage.clear('userId');
    this.authenticationService.authenticated.next(false);
  }

  public addChallenge() {
    this.modalRef = this.modalService.open(AddChallengeFormComponent, {
      windowClass: 'modal-xl fade-in-down',
      backdrop: 'static',
      ariaLabelledBy: 'modalHeading'
    });
  }
}
