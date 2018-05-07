import { TestBed, inject } from '@angular/core/testing';

import { StarsListService } from './stars-list.service';

describe('StarsListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StarsListService]
    });
  });

  it('should be created', inject([StarsListService], (service: StarsListService) => {
    expect(service).toBeTruthy();
  }));
});
