import { TestBed } from '@angular/core/testing';

import { RevisionPersonasService } from './revision-personas.service';

describe('RevisionPersonasService', () => {
  let service: RevisionPersonasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisionPersonasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
