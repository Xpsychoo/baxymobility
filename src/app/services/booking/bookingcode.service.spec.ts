import { TestBed } from '@angular/core/testing';

import { BookingcodeService } from './bookingcode.service';

describe('BookingcodeService', () => {
  let service: BookingcodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
