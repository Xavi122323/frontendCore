import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServidoresComponent } from './list-servidores.component';

describe('ListServidoresComponent', () => {
  let component: ListServidoresComponent;
  let fixture: ComponentFixture<ListServidoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListServidoresComponent]
    });
    fixture = TestBed.createComponent(ListServidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
