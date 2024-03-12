import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppraisalArticleService } from './../../services/appraisal-article.service';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-appraisal-modal',
  standalone: true,
  imports: [MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    AsyncPipe,],
  templateUrl: './delete-appraisal-modal.component.html',
  styleUrl: './delete-appraisal-modal.component.css'
})
export class DeleteAppraisalModalComponent {

  constructor(public dialogRef: MatDialogRef<DeleteAppraisalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService,
    private appraisalArticleService: AppraisalArticleService) {
      console.log(this.data);
  }

  cancelClick(): void {


    this.dialogRef.close();
  }

  deleteAppraisal() {
    this.appraisalArticleService.deleteAppraisal(this.data._id).subscribe({
      next: data => {
        this.toastr.success(data.message, 'Felicidades');
        this.dialogRef.close()
      },
      error: error => {
        this.toastr.error(error.error.errors[0], 'Error');
    }
    })
  }
}
