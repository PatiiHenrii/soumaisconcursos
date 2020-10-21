import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/shared/models/usuario';
import { Observable, of } from 'rxjs';
import { take, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Ano, Banca, Instituicao, Disciplina } from '../../models/question.model';

const urlApi = environment.api_uri;

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private http: HttpClient) { }

  selectSource(type: string, page = 0, size = 10): Observable<PageOf> {
    return this.http.get<PageOf>(`${urlApi}/${type}?page=${page}&size=${size}`)
      .pipe(
        take(1),
        catchError(this.handleError<PageOf>('selectNiveis'))
      )
  }

  deleteSource(source: any, type: string){
    let body = JSON.stringify(source);
    this.httpOptions['body'] = body;
    return this.http.delete<any>(`${urlApi}/${type}`,this.httpOptions)
      .pipe(
        take(1),
        catchError(this.handleError<any>('Delete - ', source))
      )
  }

  updateSource(source: any, type: string){
    let body = JSON.stringify(source);
    console.log(body);
    return this.http.put<any>(`${urlApi}/${type}`, body,this.httpOptions)
      .pipe(
        take(1),
        catchError(this.handleError<any>('Update - ', source))
      )
  }

  saveSource(source: any, type: string){
    let body = JSON.stringify(source);
    console.log(body);
    console.log(`${urlApi}/${type}`);
    // return of({});
    return this.http.post<any>(`${urlApi}/${type}`, body, this.httpOptions)
      .pipe(
        take(1),
        catchError(this.handleError<any>('Save - ', source))
      )
  }

  saveAllSource(source: any, type: string){
    let body = JSON.stringify(source);
    console.log(body);
    return this.http.post<any>(`${urlApi}/${type}/all`, body, this.httpOptions)
      .pipe(
        take(1),
        catchError(this.handleError<any>('Save - ', source))
      )
  }

  selectNiveis(page = 0, size = 10): Observable<PageOf> {
    return this.http.get<PageOf>(`${urlApi}/nivel?page=${page}&size=${size}`)
      .pipe(
        take(1),
        catchError(this.handleError<PageOf>('selectNiveis'))
      )
  }

  selectAnos(page = 0, size = 10): Observable<PageOf> {
    return this.http.get<PageOf>(`${urlApi}/ano?page=${page}&size=${size}`)
      .pipe(
        take(1),
        catchError(this.handleError<PageOf>('selectAnos'))
      )
  }

  selectBancas(page = 0, size = 10): Observable<PageOf> {
    return this.http.get<PageOf>(`${urlApi}/banca?page=${page}&size=${size}`)
      .pipe(
        take(1),
        catchError(this.handleError<PageOf>('selectBancas'))
      )
  }

  selectInstituicao(page = 0, size = 10): Observable<PageOf> {
    return this.http.get<PageOf>(`${urlApi}/instituicao?page=${page}&size=${size}`)
      .pipe(
        take(1),
        catchError(this.handleError<PageOf>('selectInstituicao'))
      )
  }

  selectDisciplina(page = 0, size = 10): Observable<PageOf> {
    return this.http.get<PageOf>(`${urlApi}/disciplina?page=${page}&size=${size}`)
      .pipe(
        take(1),
        catchError(this.handleError<PageOf>('selectDisciplina'))
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

export class PageOf {
  content: any
  totalElements: number
  totalPages: number
  empty: boolean
  first: boolean
  last: boolean
  size: number
  number: number
  numberOfElements: number
}