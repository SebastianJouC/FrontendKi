import { TestBed } from '@angular/core/testing';

import { PoliticService } from './politic.service';

describe('PoliticService', () => {
  let service: PoliticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
