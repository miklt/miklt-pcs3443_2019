import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVooComponent } from './edit-voo.component';

describe('EditVooComponent', () => {
  let component: EditVooComponent;
  let fixture: ComponentFixture<EditVooComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVooComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
