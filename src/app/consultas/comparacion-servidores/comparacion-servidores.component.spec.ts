import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparacionServidoresComponent } from './comparacion-servidores.component';

describe('ComparacionServidoresComponent', () => {
  let component: ComparacionServidoresComponent;
  let fixture: ComponentFixture<ComparacionServidoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComparacionServidoresComponent]
    });
    fixture = TestBed.createComponent(ComparacionServidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
