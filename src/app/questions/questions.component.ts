import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

const ano = ['2020', '2018', '2017', '2016', '2015', '2014', '2013', '2019', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000', '1999', '1998', '1997', '1996', '1995', '1994'];

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

  ano: {id: number, ano: string};
  anoList: [{id: number, ano: string}];
  anoToSearch = [];

  banca: string;
  bancaList = [];

  disciplina: string;
  disciplinaList = [];

  instituicao: string;
  instituicaoList = [];

  searchList = [{ano: this.anoToSearch}, {banca: this.bancaList}, {disciplina: this.disciplinaList}, {instituicao: this.instituicaoList}];

  constructor(
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.anoList = this.activateRoute.snapshot.data.ano.content;
    console.log(this.anoList)
  }

  public searchBy(type: any) {
    console.log(type);
    console.log(this.ano)
    switch (type) {
      case 'ano':
        if(this.ano){
          this.anoToSearch.push(this.ano);
        }
        break;
      case 'banca':
        this.bancaList.push(this.banca);
        break;
      case 'disciplina':
        this.disciplinaList.push(this.disciplina);
        break;
      case 'instituicao':
        this.instituicaoList.push(this.instituicao);
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
        this.bancaList.splice(pos, 1);
        break;
      case 'disciplina':
        this.disciplinaList.splice(pos, 1);
        break;
      case 'instituicao':
        this.instituicaoList.splice(pos, 1);
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
          : ano.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

    searchDisciplina = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2 ? []
          : ano.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

    searchInstituicao = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2 ? []
          : ano.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

    formatter = (x: {ano: string}) => x.ano;

}
