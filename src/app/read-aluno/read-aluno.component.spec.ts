import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadAlunoComponent } from './read-aluno.component';

describe('ReadAlunoComponent', () => {
  let component: ReadAlunoComponent;
  let fixture: ComponentFixture<ReadAlunoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadAlunoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
