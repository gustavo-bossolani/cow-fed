import { TestBed } from '@angular/core/testing';

import { PublicSectionGuard } from './public-section.guard';

describe('PublicSectionGuard', () => {
  let guard: PublicSectionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PublicSectionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
