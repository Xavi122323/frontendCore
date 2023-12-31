import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDatabaseComponent } from './update-database.component';

describe('UpdateDatabaseComponent', () => {
  let component: UpdateDatabaseComponent;
  let fixture: ComponentFixture<UpdateDatabaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateDatabaseComponent]
    });
    fixture = TestBed.createComponent(UpdateDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
