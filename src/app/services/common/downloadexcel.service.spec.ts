import { TestBed } from '@angular/core/testing';

import { DownloadexcelService } from './downloadexcel.service';

describe('DownloadexcelService', () => {
  let service: DownloadexcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadexcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
