import { TestBed } from '@angular/core/testing';

import { HajServiceService } from './haj-service.service';

describe('HajServiceService', () => {
  let service: HajServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HajServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
