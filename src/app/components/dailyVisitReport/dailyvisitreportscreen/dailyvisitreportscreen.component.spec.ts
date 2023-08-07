import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyvisitreportscreenComponent } from './dailyvisitreportscreen.component';

describe('DailyvisitreportscreenComponent', () => {
  let component: DailyvisitreportscreenComponent;
  let fixture: ComponentFixture<DailyvisitreportscreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyvisitreportscreenComponent]
    });
    fixture = TestBed.createComponent(DailyvisitreportscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
