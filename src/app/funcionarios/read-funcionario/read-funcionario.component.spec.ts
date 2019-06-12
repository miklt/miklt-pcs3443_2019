import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadFuncionarioComponent } from './read-funcionario.component';

describe('ReadFuncionarioComponent', () => {
  let component: ReadFuncionarioComponent;
  let fixture: ComponentFixture<ReadFuncionarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadFuncionarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
