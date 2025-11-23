import { TestBed } from '@angular/core/testing';

import { ServiceMuseum } from './service-museum';

describe('ServiceMuseum', () => {
  let service: ServiceMuseum;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMuseum);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
