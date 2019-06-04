import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVooComponent } from './create-voo.component';

describe('CreateVooComponent', () => {
  let component: CreateVooComponent;
  let fixture: ComponentFixture<CreateVooComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVooComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
