import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Ano, Banca, Instituicao, Disciplina, Nivel, Questao, Item } from 'src/app/shared/models/question.model';
import { QuestionsService } from 'src/app/shared/providers/questions/questions.service';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
  listOfItens: Item[];
  listOfResposta = [];
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

    this.listOfNiveis = this.activeReoute.snapshot.data.nivel.content;
    this.listOfAnos = this.activeReoute.snapshot.data.ano.content;
    this.listOfDisciplina = this.activeReoute.snapshot.data.disc.content;
    this.listOfBanca = this.activeReoute.snapshot.data.banca.content;
    this.listOfInstituicao = this.activeReoute.snapshot.data.inst.content;
    this.listOfQuestions = this.activeReoute.snapshot.data.questoes.content;
    console.log(this.listOfQuestions);
  }

  ngOnInit(): void {
    this.tabsToShow = [
      { title: 'Nivel', type: 'nivel', dataToList: this.listOfNiveis },
      { title: 'Ano', type: 'ano', dataToList: this.listOfAnos },
      { title: 'Disciplina', type: 'disciplina', dataToList: this.listOfDisciplina },
      { title: 'Banca', type: 'banca', dataToList: this.listOfBanca },
      { title: 'Instituição', type: 'instituicao', dataToList: this.listOfInstituicao },
    ];

    this.formMain = this.builderFormQuestao();
    this.changeListItens();
  }

  get itensArray() {
    return this.formMain.get('itens') as FormArray;
  }
  createItem(item?: Item): FormGroup {
    return this.fb.group({
      item: item ? item : '',
      valor: item ? item : ''
    });
  }
  addItem() {
    this.itensArray.push(this.createItem());
  }
  removeItem() {
    this.itensArray.removeAt(this.itensArray.length - 1);
  }

  builderForm(type: string, formDatas: any) {
    this.formMain = this.fb.group({
      id: formDatas && formDatas.id ? formDatas.id : null,
      [type]: formDatas && formDatas.id ? formDatas[type] : ''
    });
  }

  builderFormQuestao(formDatas?: Questao): FormGroup{
    console.log(formDatas);
    return this.fb.group({
      id: formDatas && formDatas.id ? formDatas.id : null,
      nivel: [this.buildFormSource('nivel', formDatas && formDatas.nivel ? formDatas.nivel : null)],
      ano: [this.buildFormSource('ano', formDatas && formDatas.ano ? formDatas.ano : null)],
      disciplina: [this.buildFormSource('disciplina', formDatas && formDatas.disciplina ? formDatas.disciplina : null)],
      banca: [this.buildFormSource('banca', formDatas && formDatas.banca ? formDatas.banca : null)],
      instituicao: [this.buildFormSource('instituicao', formDatas && formDatas.instituicao ? formDatas.instituicao : null)],
      questao: formDatas && formDatas.questao ? formDatas.questao : '',
      itens: formDatas && formDatas.itens ? this.fb.array(formDatas.itens) : this.fb.array([this.createItem()]),
      resposta: [this.createItem(formDatas && formDatas.reposta ? formDatas.reposta : null)]
    });
  }

  private buildFormSource(type: string, source?: any): FormGroup {
    return this.fb.group({
      id: [source ? source.id : null] ,
      [type]: [ source ? source[type] : "" ]
    });
  }

  open(content, edit, type, modalType) {

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

  openQuestao(content, edit, type) {

    let config = { windowClass: 'modal-mini', size: 'lg', centered: true };

    this.sourceType = type;
    this.sourceShow = edit;

    this.builderFormQuestao(edit);

    this.modalService.open(content, config).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed ${this.getDismissReason(reason)}`);
    });
  }

  saveQuestao() {
    console.log(this.formMain.value);
  }

  changeListItens() {
    if(this.formMain.get('itens'))
      this.formMain.get('itens').valueChanges.subscribe(
        el => this.listOfResposta = el
      )
  }

  public changeSource(type: string, source: any) {
    console.log(source)
    this.formMain.get(type).get('id').setValue(source.id);
    console.log(this.formMain.get(type).value);
  }

  save(type: string) {
    console.log(this.listOfNiveis);
    var source: any = this.formMain.value;
    
    console.log(source);
    this.questionService.saveSource(source, type).subscribe(
      (el) => {
        console.log(el)
        // this.updateTable(type);
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

  setFormValue(type: string, value: string) {
    console.log(JSON.stringify(type));
    console.log(this.formMain.value)
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
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  compareSource(obj1, obj2) {
    return obj1 && obj2 ? obj1.id === obj2 : obj1 === obj2;
  }
}
