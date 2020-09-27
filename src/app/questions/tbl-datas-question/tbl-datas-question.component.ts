import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tbl-datas-question',
  templateUrl: './tbl-datas-question.component.html',
  styleUrls: ['./tbl-datas-question.component.css']
})
export class TblDatasQuestionComponent implements OnInit {

  @Input() title: string;
  @Input() type: any;
  @Input() dataToList: any;


  constructor() { }

  ngOnInit(): void {
  }

}