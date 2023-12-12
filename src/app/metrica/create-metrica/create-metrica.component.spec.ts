import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMetricaComponent } from './create-metrica.component';

describe('CreateMetricaComponent', () => {
  let component: CreateMetricaComponent;
  let fixture: ComponentFixture<CreateMetricaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMetricaComponent]
    });
    fixture = TestBed.createComponent(CreateMetricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
