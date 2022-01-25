import { TestBed } from '@angular/core/testing';

import { LocStorageService } from './loc-storage.service';

describe('LocStorageService', () => {
  let service: LocStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
