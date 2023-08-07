import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyreporttableComponent } from './dailyreporttable.component';

describe('DailyreporttableComponent', () => {
  let component: DailyreporttableComponent;
  let fixture: ComponentFixture<DailyreporttableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyreporttableComponent]
    });
    fixture = TestBed.createComponent(DailyreporttableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
