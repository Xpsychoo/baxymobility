import { TestBed } from '@angular/core/testing';

import { StockreceivereportService } from './stockreceivereport.service';

describe('StockreceivereportService', () => {
  let service: StockreceivereportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockreceivereportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
