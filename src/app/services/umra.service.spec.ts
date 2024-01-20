import { TestBed } from '@angular/core/testing';

import { UmraService } from './umra.service';

describe('UmraService', () => {
  let service: UmraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UmraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
