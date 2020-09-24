import { Component, OnInit } from '@angular/core';
import { Ano } from 'src/app/shared/models/question.model';
import { QuestionsService } from 'src/app/shared/providers/questions/questions.service';

@Component({
  selector: 'app-cad-questions',
  templateUrl: './cad-questions.component.html',
  styleUrls: ['./cad-questions.component.css']
})
export class CadQuestionsComponent implements OnInit {

  listOfAnos: Ano[];

  constructor(
    private questionService: QuestionsService
  ) { }

  ngOnInit(): void {
    this.getListOfAnos();
  }

  getListOfAnos() {
    this.questionService.selectAnos().subscribe(
      el => {
        console.log(el);
        this.listOfAnos = el;
      }
    )
  }

}
