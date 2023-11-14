import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServidorComponent } from './create-servidor.component';

describe('CreateServidorComponent', () => {
  let component: CreateServidorComponent;
  let fixture: ComponentFixture<CreateServidorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateServidorComponent]
    });
    fixture = TestBed.createComponent(CreateServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
