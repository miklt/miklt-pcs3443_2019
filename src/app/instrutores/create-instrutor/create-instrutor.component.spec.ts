import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstrutorComponent } from './create-instrutor.component';

describe('CreateInstrutorComponent', () => {
  let component: CreateInstrutorComponent;
  let fixture: ComponentFixture<CreateInstrutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInstrutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInstrutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
