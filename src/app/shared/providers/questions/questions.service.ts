import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';
import { Observable, of } from 'rxjs';
import { take, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Ano } from '../../models/question.model';

const urlApi = environment.api_uri;

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  selectAnos():Observable<Ano[]> {
    return this.http.get<Ano[]>(urlApi + "/ano")
    .pipe(
      take(1),
      catchError(this.handleError<Ano[]>('selectAnos', []))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}