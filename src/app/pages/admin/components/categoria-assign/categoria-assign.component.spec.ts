import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaAssignComponent } from './categoria-assign.component';

describe('CategoriaAssignComponent', () => {
  let component: CategoriaAssignComponent;
  let fixture: ComponentFixture<CategoriaAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
