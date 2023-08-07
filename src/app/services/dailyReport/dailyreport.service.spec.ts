import { TestBed } from '@angular/core/testing';

import { DailyreportService } from './dailyreport.service';

describe('DailyreportService', () => {
  let service: DailyreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
