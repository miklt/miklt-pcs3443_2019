import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadVooComponent } from './read-voo.component';

describe('ReadVooComponent', () => {
  let component: ReadVooComponent;
  let fixture: ComponentFixture<ReadVooComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadVooComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadVooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
