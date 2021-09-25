import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalStorageService } from 'ngx-webstorage';

import { RestService } from './rest.service';

describe('RestService', () => {
  let service: RestService;

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
        }, LocalStorageService, NgbActiveModal
      ]
    });
  })().then(done).catch(done.fail));
  
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
