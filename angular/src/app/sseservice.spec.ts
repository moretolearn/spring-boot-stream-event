import { TestBed } from '@angular/core/testing';

import { SSEService } from './sseservice';

describe('SSEService', () => {
  let service: SSEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SSEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
