import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppraisalModalComponent } from './edit-appraisal-modal.component';

describe('EditAppraisalModalComponent', () => {
  let component: EditAppraisalModalComponent;
  let fixture: ComponentFixture<EditAppraisalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAppraisalModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAppraisalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
