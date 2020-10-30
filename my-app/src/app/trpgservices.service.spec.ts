import { TestBed } from '@angular/core/testing';

import { TrpgservicesService } from './trpgservices.service';

describe('TrpgservicesService', () => {
  let service: TrpgservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrpgservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
