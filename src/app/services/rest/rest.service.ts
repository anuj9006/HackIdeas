import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';

//const serverUrl = "http://localhost:3000"
@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
  ) { }
  public getRest(path: string): Observable<any> {
    return this.http.get(environment.restUrl + path);
  }

  public post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(environment.restUrl + path, body);
  }

  public put(path: string, id: any) {
    return this.http.put(environment.restUrl + path + '/' + id, {userId: this.storage.retrieve('userId')});
  }
}
