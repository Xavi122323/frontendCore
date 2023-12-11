import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateComponenteComponent } from './update-componente.component';

describe('UpdateComponenteComponent', () => {
  let component: UpdateComponenteComponent;
  let fixture: ComponentFixture<UpdateComponenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateComponenteComponent]
    });
    fixture = TestBed.createComponent(UpdateComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
