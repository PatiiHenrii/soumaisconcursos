import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TblDatasQuestionComponent } from './tbl-datas-question.component';

describe('TblDatasQuestionComponent', () => {
  let component: TblDatasQuestionComponent;
  let fixture: ComponentFixture<TblDatasQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TblDatasQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TblDatasQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
