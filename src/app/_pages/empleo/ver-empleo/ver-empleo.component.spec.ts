import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEmpleoComponent } from './ver-empleo.component';

describe('VerEmpleoComponent', () => {
  let component: VerEmpleoComponent;
  let fixture: ComponentFixture<VerEmpleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerEmpleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerEmpleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
