import { TestBed } from '@angular/core/testing';

import { ChartCalculationsService } from './chart-calculations.service';

describe('ChartCalculationsService', () => {
  let service: ChartCalculationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartCalculationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
