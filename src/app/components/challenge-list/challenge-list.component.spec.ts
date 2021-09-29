import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Challenge } from 'src/app/models/challenge.model';
import { ChallengesService } from 'src/app/services/challenges/challenges.service';
import { LocalStorageStub } from 'src/app/stubs/local-storage.service.stub';

import { ChallengeListComponent } from './challenge-list.component';

describe('ChallengeListComponent', () => {
  let component: ChallengeListComponent;
  let fixture: ComponentFixture<ChallengeListComponent>;
  let challengesService: ChallengesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeListComponent ],
      providers: [
        {
          provide: HttpClient,
          deps: [],
          useFactory:
            (handler: HttpHandler) => {
              return new HttpClient(handler);
            }
        },
        { provide: LocalStorageService, useClass: LocalStorageStub },
        SessionStorageService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeListComponent);
    challengesService = TestBed.inject(ChallengesService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  const challenge = [{
    title: 'abc',
    description : 'xyz',
    tags: ['aaa', 'bbb'],
    creationDate: new Date().getTime(),
    votes: 0,
    usersVoted: []
  },
  {
    title: 'abc',
    description : 'xyz',
    tags: ['aaa', 'bbb'],
    creationDate: new Date().getTime(),
    votes: 0,
    usersVoted: []
  }];

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add vote', () => {
    spyOn(challengesService, 'addVote').and.callFake(() => {
    })
    component.addVote(new Challenge());
    expect(challengesService.addVote).toHaveBeenCalled();
  });

  it('should sort challenges', () => {
    spyOn(component, 'sort').and.callThrough();
    spyOn(component, 'resetSortables').and.callThrough();
    spyOn(component, 'sortChallengesAscending').and.callThrough();
    spyOn(component, 'sortChallengesDescending').and.callThrough();
    component.ngOnInit();
    component.challenges = challenge;
    const element = {
        getAttribute: function(a:any) {},
        setAttribute: function(a:any) {}
    };
    component.sort({
      target: element,
      srcElement: element
    });
    expect(component.resetSortables).toHaveBeenCalled();
    expect(component.sort).toHaveBeenCalled();
    expect(component.sortChallengesAscending).toHaveBeenCalled();
  });
});
