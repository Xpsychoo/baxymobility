import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyvisitreporttableComponent } from './dailyvisitreporttable.component';

describe('DailyvisitreporttableComponent', () => {
  let component: DailyvisitreporttableComponent;
  let fixture: ComponentFixture<DailyvisitreporttableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyvisitreporttableComponent]
    });
    fixture = TestBed.createComponent(DailyvisitreporttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
