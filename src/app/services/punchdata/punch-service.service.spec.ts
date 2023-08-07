import { TestBed } from '@angular/core/testing';

import { PunchServiceService } from './punch-service.service';

describe('PunchServiceService', () => {
  let service: PunchServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PunchServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
