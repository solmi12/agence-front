import { TestBed } from '@angular/core/testing';

import { SessionManagerServiceService } from './session-manager-service.service';

describe('SessionManagerServiceService', () => {
  let service: SessionManagerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionManagerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
