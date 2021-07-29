import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  public listPlans = [
    {"titulo" : "Plano Basic", 
      "color" : "primary",
      "icon" : "ni ni-book-bookmark",
      "vantagens" : ["1 mês de acesso", "Acesso ilimitado", "Questionário de até 10 questões", "+ 50.000 questões"]
    },
    {
      "titulo" : "Plano Pro", 
      "color" : "success",
      "icon" : "fa fa-star",
      "vantagens" : ["3 meses de acesso", "Acesso ilimitado", "Questionário de até 100 questões", "+ 100.000 questões"]
    },
    {
      "titulo" : "Plano Premium", 
      "color" : "warning",
      "icon" : "fa fa-diamond",
      "vantagens" : ["12 meses de acesso", "Acesso ilimitado", "Questionário de até 1000 questões", "+ 250.000 questões"]
    }
  ];
  constructor(private router: Router) { }

  

  ngOnInit(): void {
  }

  getPath(){
    return this.router.url;
  }

}
