import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditServidorComponent } from './edit-servidor.component';

describe('EditServidorComponent', () => {
  let component: EditServidorComponent;
  let fixture: ComponentFixture<EditServidorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditServidorComponent]
    });
    fixture = TestBed.createComponent(EditServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
