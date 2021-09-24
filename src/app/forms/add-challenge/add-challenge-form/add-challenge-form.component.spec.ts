import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChallengeFormComponent } from './add-challenge-form.component';

describe('AddChallengeFormComponent', () => {
  let component: AddChallengeFormComponent;
  let fixture: ComponentFixture<AddChallengeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChallengeFormComponent ]
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
