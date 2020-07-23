import { TestBed } from '@angular/core/testing';

import { LoadingContollerService } from './loading-contoller.service';

describe('LoadingContollerService', () => {
  let service: LoadingContollerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingContollerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
