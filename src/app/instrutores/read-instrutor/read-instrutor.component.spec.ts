import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadInstrutorComponent } from './read-instrutor.component';

describe('ReadInstrutorComponent', () => {
  let component: ReadInstrutorComponent;
  let fixture: ComponentFixture<ReadInstrutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadInstrutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadInstrutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
