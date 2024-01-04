import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMetricaComponent } from './list-metrica.component';

describe('ListMetricaComponent', () => {
  let component: ListMetricaComponent;
  let fixture: ComponentFixture<ListMetricaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMetricaComponent]
    });
    fixture = TestBed.createComponent(ListMetricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
