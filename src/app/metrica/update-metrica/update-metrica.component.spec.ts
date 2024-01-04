import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMetricaComponent } from './update-metrica.component';

describe('UpdateMetricaComponent', () => {
  let component: UpdateMetricaComponent;
  let fixture: ComponentFixture<UpdateMetricaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateMetricaComponent]
    });
    fixture = TestBed.createComponent(UpdateMetricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
