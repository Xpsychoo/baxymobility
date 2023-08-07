import { TestBed } from '@angular/core/testing';

import { Converttobase64Service } from './converttobase64.service';

describe('Converttobase64Service', () => {
  let service: Converttobase64Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Converttobase64Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
