import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchattendanceComponent } from './punchattendance.component';

describe('PunchattendanceComponent', () => {
  let component: PunchattendanceComponent;
  let fixture: ComponentFixture<PunchattendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PunchattendanceComponent]
    });
    fixture = TestBed.createComponent(PunchattendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
