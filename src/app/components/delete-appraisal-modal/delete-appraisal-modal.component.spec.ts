import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAppraisalModalComponent } from './delete-appraisal-modal.component';

describe('DeleteAppraisalModalComponent', () => {
  let component: DeleteAppraisalModalComponent;
  let fixture: ComponentFixture<DeleteAppraisalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteAppraisalModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteAppraisalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
