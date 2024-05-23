import { TestBed } from '@angular/core/testing';

import { SearchMatchService } from './search-match.service';

describe('SearchMatchService', () => {
  let service: SearchMatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchMatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
