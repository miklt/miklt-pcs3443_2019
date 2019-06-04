import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVooComponent } from './list-voo.component';

describe('ListVooComponent', () => {
  let component: ListVooComponent;
  let fixture: ComponentFixture<ListVooComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVooComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
