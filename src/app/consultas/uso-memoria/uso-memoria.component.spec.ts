import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsoMemoriaComponent } from './uso-memoria.component';

describe('UsoMemoriaComponent', () => {
  let component: UsoMemoriaComponent;
  let fixture: ComponentFixture<UsoMemoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsoMemoriaComponent]
    });
    fixture = TestBed.createComponent(UsoMemoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
