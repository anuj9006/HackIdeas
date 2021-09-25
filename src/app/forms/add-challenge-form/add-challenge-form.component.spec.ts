import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-webstorage';
import { ChallengesService } from 'src/app/services/challenges/challenges.service';
import { LocalStorageStub } from 'src/app/stubs/local-storage.service.stub';
import { NgbActiveModalStub } from 'src/app/stubs/ngb-active-modal.stub';

import { AddChallengeFormComponent } from './add-challenge-form.component';

describe('AddChallengeFormComponent', () => {
  let component: AddChallengeFormComponent;
  let fixture: ComponentFixture<AddChallengeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NgbModule ],
      declarations: [],
      providers: [
         ChallengesService, FormBuilder, HttpClient, HttpHandler,
         { provide: LocalStorageService, useClass: LocalStorageStub },
        { provide: NgbActiveModal, useClass: NgbActiveModalStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChallengeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
