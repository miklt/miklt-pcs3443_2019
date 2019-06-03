import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlunoComponent } from './list-aluno.component';

describe('ListAlunoComponent', () => {
  let component: ListAlunoComponent;
  let fixture: ComponentFixture<ListAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAlunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
