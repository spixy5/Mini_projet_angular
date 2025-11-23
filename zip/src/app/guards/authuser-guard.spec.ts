import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authuserGuard } from './authuser-guard';

describe('authuserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authuserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
