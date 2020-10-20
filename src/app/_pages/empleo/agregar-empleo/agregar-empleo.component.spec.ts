import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEmpleoComponent } from './agregar-empleo.component';

describe('AgregarEmpleoComponent', () => {
  let component: AgregarEmpleoComponent;
  let fixture: ComponentFixture<AgregarEmpleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarEmpleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEmpleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
