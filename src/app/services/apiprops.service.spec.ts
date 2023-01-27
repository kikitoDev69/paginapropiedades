import { TestBed } from '@angular/core/testing';

import { ApipropsService } from './apiprops.service';

describe('ApipropsService', () => {
  let service: ApipropsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApipropsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
