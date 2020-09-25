import { Component, OnInit } from '@angular/core';
import { Ano, Banca, Instituicao, Disciplina } from 'src/app/shared/models/question.model';
import { QuestionsService } from 'src/app/shared/providers/questions/questions.service';

@Component({
  selector: 'app-cad-questions',
  templateUrl: './cad-questions.component.html',
  styleUrls: ['./cad-questions.component.css']
})
export class CadQuestionsComponent implements OnInit {

  listOfAnos: Ano[];
  listOfBanca: Banca[];
  listOfInstituicao: Instituicao[];
  listOfDisciplina: Disciplina[];

  constructor(
    private questionService: QuestionsService
  ) { }

  ngOnInit(): void {
    this.getListOfAnos();
    this.getListOfBancas();
    this.getListOfDisciplina();
    this.getListOfInstituicao();
  }

  getListOfAnos() {
    this.questionService.selectAnos().subscribe(
      el => {
        console.log(el);
        this.listOfAnos = el.content;
      }
    )
  }

  getListOfBancas() {
    this.questionService.selectBancas().subscribe(
      el => {
        console.log(el);
        this.listOfBanca = el.content;
      }
    )
  }

  getListOfInstituicao() {
    this.questionService.selectInstituicao().subscribe(
      el => {
        console.log(el);
        this.listOfInstituicao = el.content;
      }
    )
  }

  getListOfDisciplina() {
    this.questionService.selectDisciplina().subscribe(
      el => {
        console.log(el);
        this.listOfDisciplina = el.content;
      }
    )
  }

}
