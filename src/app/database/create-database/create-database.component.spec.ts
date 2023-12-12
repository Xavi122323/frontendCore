import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDatabaseComponent } from './create-database.component';

describe('CreateDatabaseComponent', () => {
  let component: CreateDatabaseComponent;
  let fixture: ComponentFixture<CreateDatabaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDatabaseComponent]
    });
    fixture = TestBed.createComponent(CreateDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
