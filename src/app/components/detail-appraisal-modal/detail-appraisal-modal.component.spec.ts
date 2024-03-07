import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAppraisalModalComponent } from './detail-appraisal-modal.component';

describe('DetailAppraisalModalComponent', () => {
  let component: DetailAppraisalModalComponent;
  let fixture: ComponentFixture<DetailAppraisalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAppraisalModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailAppraisalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
