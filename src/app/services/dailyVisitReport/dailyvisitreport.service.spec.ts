import { TestBed } from '@angular/core/testing';

import { DailyvisitreportService } from './dailyvisitreport.service';

describe('DailyvisitreportService', () => {
  let service: DailyvisitreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyvisitreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
