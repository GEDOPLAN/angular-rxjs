import { TestBed, inject } from '@angular/core/testing';

import { JSONService } from './json.service';

describe('JSONService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JSONService]
    });
  });

  it('should be created', inject([JSONService], (service: JSONService) => {
    expect(service).toBeTruthy();
  }));
});
