import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';
import { Observable, of } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const urlApi = environment.api_uri;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  selectUsers():Observable<Usuario[]> {
    return this.http.get<Usuario[]>(urlApi)
    .pipe(
      take(1),
      catchError(this.handleError<Usuario[]>('selectUsers', []))
    )
  }

  createUser(usuario: Usuario):Observable<Usuario> {
    return this.http.post<Usuario>(`${urlApi}/usuario/register`, usuario, this.httpOptions)
    .pipe(
      take(1),
      catchError(this.handleError<Usuario>('createUser'))
    )
  }

  updateUser(usuario: Usuario):Observable<Usuario> {
    return this.http.put<Usuario>(urlApi, usuario, this.httpOptions)
    .pipe(
      take(1),
      catchError(this.handleError<Usuario>('updateUser'))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }
}
