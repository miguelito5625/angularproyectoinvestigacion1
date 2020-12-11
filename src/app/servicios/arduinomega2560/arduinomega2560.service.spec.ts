import { TestBed } from '@angular/core/testing';

import { Arduinomega2560Service } from './arduinomega2560.service';

describe('Arduinomega2560Service', () => {
  let service: Arduinomega2560Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Arduinomega2560Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
