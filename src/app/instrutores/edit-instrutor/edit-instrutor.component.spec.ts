import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstrutorComponent } from './edit-instrutor.component';

describe('EditInstrutorComponent', () => {
  let component: EditInstrutorComponent;
  let fixture: ComponentFixture<EditInstrutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInstrutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstrutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
