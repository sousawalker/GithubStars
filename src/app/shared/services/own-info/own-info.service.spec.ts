import { TestBed, inject } from '@angular/core/testing';

import { OwnInfoService } from './own-info.service';

describe('OwnInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnInfoService]
    });
  });

  it('should be created', inject([OwnInfoService], (service: OwnInfoService) => {
    expect(service).toBeTruthy();
  }));
});
