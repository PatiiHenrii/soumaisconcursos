import { Observable } from 'rxjs';
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

  ano: string;
  anoList = [];

  banca: string;
  bancaList = [];

  disciplina: string;
  disciplinaList = [];

  instituicao: string;
  instituicaoList = [];

  searchList = [];

  constructor() { }

  ngOnInit(): void {
  }

  searchBy(type: string) {
    console.log(type);
    console.log(this.banca);
    switch (type) {
      case 'ano':
        if(this.ano){
          this.anoList.push(this.ano);
          this.searchList.push({ano: this.anoList});
        }
        break;
      case 'banca':
        this.bancaList.push(this.banca);
        this.searchList.push({banca: this.bancaList});
        break;
      case 'disciplina':
        this.disciplinaList.push(this.disciplina);
        this.searchList.push({disciplina: this.disciplinaList});
        break;
      case 'instituicao':
        this.instituicaoList.push(this.instituicao);
        this.searchList.push({instituicao: this.instituicaoList});
        break;
    }
    console.log(this.searchList);

  }

  searchAno = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2 ? []
          : ano.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2 ? []
          : ano.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

}
