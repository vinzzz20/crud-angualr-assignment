import { TestBed } from '@angular/core/testing';

import { ProcuctService } from './procuct.service';

describe('ProcuctService', () => {
  let service: ProcuctService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcuctService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
