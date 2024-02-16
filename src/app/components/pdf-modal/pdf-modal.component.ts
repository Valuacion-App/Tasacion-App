import { PdfService } from './../../services/pdf-service.service';
import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose } from '@angular/material/dialog';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { appraisalArticle } from '../../interfaces/appraisal.interface';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-pdf-modal',
  standalone: true,
  imports: [MatTableModule,MatPaginatorModule, MatDialogContent, MatButtonModule, MatDialogActions, MatDialogTitle, MatDialogClose],
  templateUrl: './pdf-modal.component.html',
  styleUrl: './pdf-modal.component.css'
})
export class PdfModalComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'appraisalCode',
    'code',
    'article',
  ];
  dataTasation: MatTableDataSource<appraisalArticle>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialogRef: MatDialogRef<PdfModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pdfService: PdfService) {
    this.dataTasation = new MatTableDataSource(data.appraisals)
  }

  ngAfterViewInit() {
    this.dataTasation.paginator = this.paginator;
  }
  cancelAction(): void {
    this.dialogRef.close();
  }
  createPdf() {
    this.pdfService.createPdf(this.data.appraisals).subscribe(res => {
      let blob = new Blob([res], { type: 'application/pdf' });
    let pdfUrl = window.URL.createObjectURL(blob);

    var PDF_link = document.createElement('a');
    PDF_link.href = pdfUrl;
  //   TO DOWNLOAD PDF TO YOUR COMPUTER
    PDF_link.download = "Ficha_Tecnica.pdf";
    PDF_link.click();
    })
  }
}
