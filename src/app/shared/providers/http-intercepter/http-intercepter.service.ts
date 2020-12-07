import { Injectable } from '@angular/core';
import { ɵHttpInterceptingHandler, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticatedService } from '../authenticated/authenticated.service';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterService implements HttpInterceptor{

  constructor(
    private authenticatedService: AuthenticatedService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let basicAuth = this.authenticatedService.getAuthenticatedToken();
    let username = this.authenticatedService.getAuthenticatedUser();

    if(basicAuth && username) {
      req = req.clone({
        setHeaders : {
          Authorization: basicAuth
        }
      });
    }
    
    console.log(`Authorization: ${basicAuth}`)

    return next.handle(req);
  }
}
