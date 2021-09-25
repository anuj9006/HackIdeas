import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalStorageService } from 'ngx-webstorage';
import { LocalStorageStub } from 'src/app/stubs/local-storage.service.stub';

import { ChallengeListComponent } from './challenge-list.component';

describe('ChallengeListComponent', () => {
  let component: ChallengeListComponent;
  let fixture: ComponentFixture<ChallengeListComponent>;


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
        { provide: LocalStorageService, useClass: LocalStorageStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
