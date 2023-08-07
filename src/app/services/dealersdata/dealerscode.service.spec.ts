import { TestBed } from '@angular/core/testing';

import { DealerscodeService } from './dealerscode.service';

describe('DealerscodeService', () => {
  let service: DealerscodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealerscodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
