import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { AuthenticationService } from '../authentication/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!req.url.includes('/login')) {
      const token:any = sessionStorage.getItem('token');
      let headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token
      });
      const clonedRequest = req.clone({
        headers: headers,
        body: req.body
      });
      return next.handle(clonedRequest).pipe(
        tap(evt => {
        }),
        catchError((err: any) => {
            if(err instanceof HttpErrorResponse) {
                try {
                    if(err && err.status === 403) {
                      this.authenticationService.authenticated.next(false);
                    }
                } catch(e) {
                }            }
            return of(err);
        }));
     } else {
      return next.handle(req);
    }
  }
}
