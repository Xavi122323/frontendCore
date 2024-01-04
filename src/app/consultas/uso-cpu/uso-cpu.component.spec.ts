import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsoCPUComponent } from './uso-cpu.component';

describe('UsoCPUComponent', () => {
  let component: UsoCPUComponent;
  let fixture: ComponentFixture<UsoCPUComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsoCPUComponent]
    });
    fixture = TestBed.createComponent(UsoCPUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
