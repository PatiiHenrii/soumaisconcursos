import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  focus;
  focus1;
  focus5;

  focus$ = new Subject<string>();

  ano: { id: number, ano: string };
  anoList: [{ id: number, ano: string }];
  anoToSearch = [];

  banca: { id: number, banca: string };
  bancaList: [{ id: number, banca: string }];
  bancaToSearch = [];

  disciplina: { id: number, disciplina: string };
  disciplinaList: [{ id: number, disciplina: string }];
  disciplinaToSearch = [];

  instituicao: { id: number, instituicao: string };
  instituicaoList: [{ id: number, instituicao: string }];
  instituicaoToSearch = [];

  questaoList: [any];

  searchList = [{ ano: this.anoToSearch }, { banca: this.bancaToSearch }, { disciplina: this.disciplinaToSearch }, { instituicao: this.instituicaoToSearch }];

  constructor(
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log(this.activateRoute.snapshot.data);
    this.anoList = this.activateRoute.snapshot.data.ano.content;
    this.bancaList = this.activateRoute.snapshot.data.banca.content;
    this.disciplinaList = this.activateRoute.snapshot.data.disc.content;
    this.instituicaoList = this.activateRoute.snapshot.data.inst.content;
    this.questaoList = this.activateRoute.snapshot.data.questoes.content;
    console.log(this.anoList)
  }

  public searchBy(type: any) {
    console.log(type);
    switch (type) {
      case 'ano':
        console.log(this.ano);
        if (this.ano) {
          this.anoToSearch.push(this.ano);
        }
        break;
      case 'banca':
        console.log(this.banca);
        if (this.banca) {
          this.bancaToSearch.push(this.banca);
        }
        break;
      case 'disciplina':
        console.log(this.disciplina);
        if (this.disciplina) {
          this.disciplinaToSearch.push(this.disciplina);
        }
        break;
      case 'instituicao':
        console.log(this.instituicao);
        if (this.instituicao) {
          this.instituicaoToSearch.push(this.instituicao);
        }
        break;
    }
    console.log(this.searchList);

  }

  public remove(type: string, pos: number) {
    switch (type) {
      case 'ano':
        this.anoToSearch.splice(pos, 1);
        break;
      case 'banca':
        this.bancaToSearch.splice(pos, 1);
        break;
      case 'disciplina':
        this.disciplinaToSearch.splice(pos, 1);
        break;
      case 'instituicao':
        this.instituicaoToSearch.splice(pos, 1);
        break;
    }
  }

  searchAno = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2 ? []
          : this.anoList.filter(v => v.ano.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  searchBanca = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2 ? []
          : this.bancaList.filter(v => v.banca.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  searchDisciplina = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2 ? []
          : this.disciplinaList.filter(v => v.disciplina.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  searchInstituicao = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2 ? []
          : this.instituicaoList.filter(v => v.instituicao.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  formatterAno = (x: { ano: string }) => x.ano;
  formatterBan = (x: { banca: string }) => x.banca;
  formatterIns = (x: { instituicao: string }) => x.instituicao;
  formatterDis = (x: { disciplina: string }) => x.disciplina;

}
