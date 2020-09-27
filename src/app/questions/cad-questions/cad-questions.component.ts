import { Component, OnInit } from '@angular/core';
import { Ano, Banca, Instituicao, Disciplina, Nivel } from 'src/app/shared/models/question.model';
import { QuestionsService } from 'src/app/shared/providers/questions/questions.service';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cad-questions',
  templateUrl: './cad-questions.component.html',
  styleUrls: ['./cad-questions.component.css']
})
export class CadQuestionsComponent implements OnInit {

  formMain: FormGroup;

  listOfAnos: Ano[];
  listOfBanca: Banca[];
  listOfInstituicao: Instituicao[];
  listOfDisciplina: Disciplina[];
  listOfNiveis: Nivel[];
  tabsToShow: any;

  sourceToEdit: any;
  sourceType: string;

  constructor(
    private questionService: QuestionsService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    config: NgbModalConfig,
    private activeReoute: ActivatedRoute
  ) {
    config.backdrop = 'static';
    console.log(this.activeReoute.snapshot.data);
    this.listOfNiveis = this.activeReoute.snapshot.data.nivel.content;
    this.listOfAnos = this.activeReoute.snapshot.data.ano.content;
    this.listOfDisciplina = this.activeReoute.snapshot.data.disc.content;
    this.listOfBanca = this.activeReoute.snapshot.data.banca.content;
    this.listOfInstituicao = this.activeReoute.snapshot.data.inst.content;
  }

  ngOnInit(): void {
    // this.getListOfAnos();
    // this.getListOfBancas();
    // this.getListOfDisciplina();
    this.getListOfInstituicao();

    this.tabsToShow = [
      {title: 'Nivel', type : 'nivel', dataToList: this.listOfNiveis},
      {title: 'Ano', type : 'ano', dataToList: this.listOfAnos},
      {title: 'Disciplina', type : 'disciplina', dataToList: this.listOfDisciplina},
      {title: 'Banca', type : 'banca', dataToList: this.listOfBanca},
      {title: 'Instituição', type : 'instituicao', dataToList: this.listOfInstituicao},
    ];
    console.log(this.tabsToShow);
    this.tabsToShow.forEach(element => {
      console.log(element);
    });
  }

  private getListOfNiveis() {
    this.questionService.selectNiveis().subscribe(
      el => {
        console.log(el);
        this.listOfNiveis = el.content;
      }
    )
  }

  private getListOfAnos() {
    this.questionService.selectAnos().subscribe(
      el => {
        console.log(el);
        this.listOfAnos = el.content;
      }
    )
  }

  private getListOfBancas() {
    this.questionService.selectBancas().subscribe(
      el => {
        console.log(el);
        this.listOfBanca = el.content;
      }
    )
  }

  private getListOfInstituicao() {
    this.questionService.selectInstituicao().subscribe(
      el => {
        console.log(el);
        this.listOfInstituicao = el.content;
      }
    )
  }

  private getListOfDisciplina() {
    this.questionService.selectDisciplina().subscribe(
      el => {
        console.log(el);
        this.listOfDisciplina = el.content;
      }
    )
  }

  builderForm(type: string, formDatas: any) {
    this.formMain = this.fb.group({
      id : formDatas.id,
      [type] : formDatas[type] 
    });
  }

  // edit(type: string, data: any) {
  //   console.log(data);
  //   const modalRef = this.modalService.open(ModalEditComponent);
  //   modalRef.componentInstance.datas = {type, data};
  // }

  open(content, edit, type) {
    this.sourceToEdit = edit;
    this.sourceType = type;
    console.log(this.sourceToEdit);
    console.log(this.sourceToEdit[this.sourceType]);
    console.log(this.sourceType);

    this.builderForm(type, edit); 
    
    this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true}).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  save() {
    console.log(this.formMain.value);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
