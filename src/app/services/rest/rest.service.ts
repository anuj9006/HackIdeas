import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';

//const serverUrl = "http://localhost:3000"
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient,
    private storage: SessionStorageService
  ) { }
  public getRest(path: string): Observable<any> {
    return this.http.get(environment.restUrl + path);
  }

  public post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(environment.restUrl + path, body, { headers: this.setHeaders() });
  }
  public setHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return headers;
  }

  public put(path: string, id: any) {
    return this.http.put(environment.restUrl + path + '/' + id, {userId: sessionStorage.getItem('userId')});
  }
}
