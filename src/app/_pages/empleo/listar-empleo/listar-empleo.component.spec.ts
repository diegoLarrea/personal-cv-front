import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEmpleoComponent } from './listar-empleo.component';

describe('ListarEmpleoComponent', () => {
  let component: ListarEmpleoComponent;
  let fixture: ComponentFixture<ListarEmpleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEmpleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEmpleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
