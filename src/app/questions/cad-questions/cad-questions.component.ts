import { Component, OnInit } from '@angular/core';
import { Ano, Banca, Instituicao, Disciplina, Nivel } from 'src/app/shared/models/question.model';
import { QuestionsService } from 'src/app/shared/providers/questions/questions.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';

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
  listOfNiveis: Nivel[];

  constructor(
    private questionService: QuestionsService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
  }

  ngOnInit(): void {
    this.getListOfAnos();
    this.getListOfBancas();
    this.getListOfDisciplina();
    this.getListOfInstituicao();
  }

  getListOfNiveis() {
    this.questionService.selectNiveis().subscribe(
      el => {
        console.log(el);
        this.listOfNiveis = el.content;
      }
    )
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

  edit(type: string, data: any) {
    console.log(data);
    const modalRef = this.modalService.open(ModalEditComponent);
    modalRef.componentInstance.datas = {type, data};
  }
}
