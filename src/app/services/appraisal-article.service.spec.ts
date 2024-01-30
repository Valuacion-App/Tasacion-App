import { TestBed } from '@angular/core/testing';

import { AppraisalArticleService } from './appraisal-article.service';

describe('AppraisalArticleService', () => {
  let service: AppraisalArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppraisalArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
