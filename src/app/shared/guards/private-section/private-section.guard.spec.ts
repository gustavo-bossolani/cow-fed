import { TestBed } from '@angular/core/testing';

import { PrivateSectionGuard } from './private-section.guard';

describe('SessionGuardGuard', () => {
  let guard: PrivateSectionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PrivateSectionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
