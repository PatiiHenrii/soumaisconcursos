import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const url_api = environment.api_uri;

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedService {

  constructor(private http: HttpClient) { }

  authenticatedUser(username, password) {
    // let basicAuth = 'Basic '+ window.btoa(username + ':' + password);

    // let headers = new HttpHeaders({
    //     Authorization: basicAuth
    // });
    return this.http.post(`${url_api}/authenticate`, {username, password})
      .pipe(
        map(
          data => {
            console.log(data)
            sessionStorage.setItem('authenticatedUser', username);
            sessionStorage.setItem('token', `Bearer ${data['token']}`);
          }
        )
      )
  }

  getAuthenticatedUser() {
    return sessionStorage.getItem('authenticatedUser');
  }

  getAuthenticatedToken() {
    return sessionStorage.getItem('token');
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');
    sessionStorage.removeItem('token');
  }
}

