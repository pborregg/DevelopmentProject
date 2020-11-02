/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CharAttributeService } from './char-attribute.service';

describe('Service: CharAttribute', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CharAttributeService]
    });
  });

  it('should ...', inject([CharAttributeService], (service: CharAttributeService) => {
    expect(service).toBeTruthy();
  }));
});
