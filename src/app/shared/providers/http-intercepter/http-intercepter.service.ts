import { Injectable } from '@angular/core';
import { ɵHttpInterceptingHandler, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpIntercepterService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let username = 'patii';
    let password = '123456';

    let basicAuth = 'Basic '+ window.btoa(username + ':' + password);

    req = req.clone({
      setHeaders : {
        Authorization: basicAuth
      }
    });

    console.log(`Authorization: ${basicAuth}`)

    return next.handle(req);
  }
}
