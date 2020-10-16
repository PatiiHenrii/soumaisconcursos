import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Ano, Banca, Disciplina, Instituicao, Nivel } from "../../models/question.model";
import { QuestionsService } from "./questions.service";

@Injectable({ providedIn: 'root' })
export class AnoQuestionResolver implements Resolve<Ano> {
  constructor(private service: QuestionsService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.selectSource('ano');
  }
}

@Injectable({ providedIn: 'root' })
export class BancaQuestionResolver implements Resolve<Banca> {
  constructor(private service: QuestionsService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.selectSource('banca');
  }
}

@Injectable({ providedIn: 'root' })
export class InstituicaoQuestionResolver implements Resolve<Instituicao> {
  constructor(private service: QuestionsService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.selectSource('instituicao');
  }
}

@Injectable({ providedIn: 'root' })
export class DisciplinaQuestionResolver implements Resolve<Disciplina> {
  constructor(private service: QuestionsService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.selectSource('disciplina');
  }
}

@Injectable({ providedIn: 'root' })
export class NiveisQuestionResolver implements Resolve<Nivel> {
  constructor(private service: QuestionsService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.selectSource('nivel');
  }
}

@Injectable({ providedIn: 'root' })
export class QuestionsResolver implements Resolve<Nivel> {
  constructor(private service: QuestionsService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.selectSource('questao');
  }
}
