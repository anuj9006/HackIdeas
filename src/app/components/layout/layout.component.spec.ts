import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { ChallengesService } from 'src/app/services/challenges/challenges.service';
import { LocalStorageStub } from 'src/app/stubs/local-storage.service.stub';
import { ChallengeListComponent } from '../challenge-list/challenge-list.component';
import { NavbarComponent } from '../navbar/navbar.component';

import { LayoutComponent } from './layout.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let challengesService: ChallengesService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgbModule],
      declarations: [ LayoutComponent, NavbarComponent, ChallengeListComponent ],
      providers: [ HttpClient, HttpHandler,
        { provide: LocalStorageService, useClass: LocalStorageStub },
        SessionStorageService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    challengesService = TestBed.inject(ChallengesService);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get challenges', () => {
    spyOn(challengesService, 'getChallenges');
    component.ngOnInit();
    expect(challengesService.getChallenges).toHaveBeenCalled();
  });
});
