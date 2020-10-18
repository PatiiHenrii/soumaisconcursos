import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Ano, Banca, Instituicao, Disciplina, Nivel, Questao } from 'src/app/shared/models/question.model';
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

  listOfQuestions: Questao[];
  listOfNiveis: Nivel[];
  listOfAnos: Ano[];
  listOfDisciplina: Disciplina[];
  listOfBanca: Banca[];
  listOfInstituicao: Instituicao[];
  tabsToShow: any;

  sourceType: string;
  sourceShow: any;

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
    this.listOfQuestions = this.activeReoute.snapshot.data.questoes.content;
    console.log(this.listOfQuestions);
  }

  ngOnInit(): void {
    // this.getListOfAnos();
    // this.getListOfBancas();
    // this.getListOfDisciplina();
    // this.getListOfInstituicao();

    this.tabsToShow = [
      { title: 'Nivel', type: 'nivel', dataToList: this.listOfNiveis },
      { title: 'Ano', type: 'ano', dataToList: this.listOfAnos },
      { title: 'Disciplina', type: 'disciplina', dataToList: this.listOfDisciplina },
      { title: 'Banca', type: 'banca', dataToList: this.listOfBanca },
      { title: 'Instituição', type: 'instituicao', dataToList: this.listOfInstituicao },
    ];
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
      id: formDatas && formDatas.id ? formDatas.id : null,
      [type]: formDatas && formDatas.id ? formDatas[type] : ''
    });
  }

  open(content, edit, type, modalType) {

    console.log(modalType)
    let config = { windowClass: 'modal-mini', size: 'md', centered: true };
    if (modalType === 'notify') {
      config.windowClass = 'modal-danger';
      config.size = 'sm';
    }

    this.sourceType = type;
    this.sourceShow = edit;

    this.builderForm(type, edit);

    this.modalService.open(content, config).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  save(type: string) {
    var source: any = this.formMain.value;
    this.questionService.saveSource(source, type).subscribe(
      () => {
        this.updateTable(type);
      }
    );
  }

  saveAll(type: string) {
    var source = this.formMain.value;
    let listInsert = [];
    if (source[type].indexOf(',') !== -1) {
      let listSource = source[type].split(',');
      listSource.forEach(element => {
        listInsert.push({ id: null, [type]: element });
      });
    }
    console.log(listInsert);
    this.questionService.saveAllSource(listInsert, type).subscribe(
      () => {
        this.updateTable(type);
      }
    );
  }

  updateItem(type: string) {
    let source = this.formMain.value;
    this.questionService.updateSource(source, type).subscribe(
      () => {
        this.updateTable(type);
      }
    );

  }

  deleteItem(source: any, type: string) {
    this.questionService.deleteSource(source, type).subscribe(
      el => {
        console.log(el);
        console.log(`Delete ${type}`, source);
        this.updateTable(type);
      }

    );
  }

  updateTable(type: string) {
    switch (type) {
      case 'nivel':
        this.questionService.selectSource(type).subscribe(
          el => {
            this.listOfNiveis = el.content
            window.location.reload();
          }
        );
        break;
      case 'ano':
        this.questionService.selectSource(type).subscribe(
          el => {
            this.listOfAnos = el.content;
            window.location.reload();
          }
        );
        break;
      case 'disciplina':
        this.questionService.selectSource(type).subscribe(
          el => {
            this.listOfDisciplina = el.content
            window.location.reload();
          }
        );
        break;
      case 'banca':
        this.questionService.selectSource(type).subscribe(
          el => {
            this.listOfBanca = el.content;
            window.location.reload();
          }
        );
        break;
      case 'instituicao':
        this.questionService.selectSource(type).subscribe(
          el => {
            this.listOfInstituicao = el.content
            window.location.reload();
          }
        );
        break;
    }
  }

  delNivel(nivel: Nivel) {
    console.log("Delete nivel");
    this.questionService;
  }

  delAno(ano: Ano) {
    console.log("Delete ano");
    this.questionService;
  }

  delDisc(disciplina: Disciplina) {
    console.log("Delete disciplina");
    this.questionService;
  }

  delBanca(banca: Banca) {
    console.log("Delete banca");
    this.questionService;
  }

  delInst(instituicao: Instituicao) {
    console.log("Delete instituicao");
    this.questionService;
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
