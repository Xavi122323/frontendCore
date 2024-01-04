import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionesBaseComponent } from './transacciones-base.component';

describe('TransaccionesBaseComponent', () => {
  let component: TransaccionesBaseComponent;
  let fixture: ComponentFixture<TransaccionesBaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransaccionesBaseComponent]
    });
    fixture = TestBed.createComponent(TransaccionesBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
