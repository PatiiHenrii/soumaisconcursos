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
    return this.service.selectAnos();
  }
}

@Injectable({ providedIn: 'root' })
export class BancaQuestionResolver implements Resolve<Banca> {
  constructor(private service: QuestionsService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.selectBancas();
  }
}

@Injectable({ providedIn: 'root' })
export class InstituicaoQuestionResolver implements Resolve<Instituicao> {
  constructor(private service: QuestionsService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.selectInstituicao();
  }
}

@Injectable({ providedIn: 'root' })
export class DisciplinaQuestionResolver implements Resolve<Disciplina> {
  constructor(private service: QuestionsService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.selectDisciplina();
  }
}

@Injectable({ providedIn: 'root' })
export class NiveisQuestionResolver implements Resolve<Nivel> {
  constructor(private service: QuestionsService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return this.service.selectNiveis();
  }
}
