import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit {

  @Input() datas;

  constructor() { }

  ngOnInit(): void {
    console.log(this.datas);
  }

  close() {
  }

}
