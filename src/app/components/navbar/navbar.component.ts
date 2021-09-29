import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AddChallengeFormComponent } from 'src/app/forms/add-challenge-form/add-challenge-form.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private modalRef: NgbModalRef;
  constructor(
    private authenticationService: AuthenticationService,
    private modalService: NgbModal    
  ) { }

  ngOnInit(): void {
  }

  public logout() {
    sessionStorage.clear();
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
