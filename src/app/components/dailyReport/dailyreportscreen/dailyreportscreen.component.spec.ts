import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyreportscreenComponent } from './dailyreportscreen.component';

describe('DailyreportscreenComponent', () => {
  let component: DailyreportscreenComponent;
  let fixture: ComponentFixture<DailyreportscreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyreportscreenComponent]
    });
    fixture = TestBed.createComponent(DailyreportscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
