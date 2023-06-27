import { TestBed } from '@angular/core/testing';

import { StatementService } from './statement.service';

describe('StatementsService', () => {
  let service: StatementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
