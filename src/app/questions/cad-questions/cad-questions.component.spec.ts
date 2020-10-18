import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadQuestionsComponent } from './cad-questions.component';

describe('CadQuestionsComponent', () => {
  let component: CadQuestionsComponent;
  let fixture: ComponentFixture<CadQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
