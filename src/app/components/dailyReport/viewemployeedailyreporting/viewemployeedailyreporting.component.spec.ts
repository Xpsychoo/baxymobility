import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewemployeedailyreportingComponent } from './viewemployeedailyreporting.component';

describe('ViewemployeedailyreportingComponent', () => {
  let component: ViewemployeedailyreportingComponent;
  let fixture: ComponentFixture<ViewemployeedailyreportingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewemployeedailyreportingComponent]
    });
    fixture = TestBed.createComponent(ViewemployeedailyreportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
