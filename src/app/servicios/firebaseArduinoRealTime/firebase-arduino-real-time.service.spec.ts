import { TestBed } from '@angular/core/testing';

import { FirebaseArduinoRealTimeService } from './firebase-arduino-real-time.service';

describe('FirebaseArduinoRealTimeService', () => {
  let service: FirebaseArduinoRealTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseArduinoRealTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
