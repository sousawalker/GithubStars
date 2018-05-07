import { TestBed, inject } from '@angular/core/testing';

import { StarsActionsService } from './stars-actions.service';

describe('StarsActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StarsActionsService]
    });
  });

  it('should be created', inject([StarsActionsService], (service: StarsActionsService) => {
    expect(service).toBeTruthy();
  }));
});
