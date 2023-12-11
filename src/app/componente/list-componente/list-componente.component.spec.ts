import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponenteComponent } from './list-componente.component';

describe('ListComponenteComponent', () => {
  let component: ListComponenteComponent;
  let fixture: ComponentFixture<ListComponenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListComponenteComponent]
    });
    fixture = TestBed.createComponent(ListComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
