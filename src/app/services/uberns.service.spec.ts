import { TestBed } from '@angular/core/testing';

import { UbernsService } from './uberns.service';

describe('UbernsService', () => {
  let service: UbernsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UbernsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
