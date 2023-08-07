import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwRetailpunchReportComponent } from './sw-retailpunch-report.component';

describe('SwRetailpunchReportComponent', () => {
  let component: SwRetailpunchReportComponent;
  let fixture: ComponentFixture<SwRetailpunchReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SwRetailpunchReportComponent]
    });
    fixture = TestBed.createComponent(SwRetailpunchReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
