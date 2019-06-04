import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInstrutorComponent } from './list-instrutor.component';

describe('ListInstrutorComponent', () => {
  let component: ListInstrutorComponent;
  let fixture: ComponentFixture<ListInstrutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInstrutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInstrutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
