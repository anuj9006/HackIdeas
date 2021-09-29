import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { RestService } from '../rest/rest.service';

import { ChallengesService } from './challenges.service';

describe('ChallengesService', () => {
  let service: ChallengesService;

  beforeAll(done => (async () => {
    TestBed.configureTestingModule({
      providers: [
        RestService,
        {
          provide: HttpClient,
          deps: [],
          useFactory:
            (handler: HttpHandler) => {
              return new HttpClient(handler);
            }
        }, LocalStorageService, RestService, SessionStorageService
      ]
    });
  })().then(done).catch(done.fail));
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChallengesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
