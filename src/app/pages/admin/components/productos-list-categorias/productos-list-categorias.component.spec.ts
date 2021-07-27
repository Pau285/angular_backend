import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosListCategoriasComponent } from './productos-list-categorias.component';

describe('ProductosListCategoriasComponent', () => {
  let component: ProductosListCategoriasComponent;
  let fixture: ComponentFixture<ProductosListCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosListCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosListCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
