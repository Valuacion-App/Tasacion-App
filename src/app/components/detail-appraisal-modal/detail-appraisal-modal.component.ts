import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  imageOne: string;
  imageTwo: string;
}


@Component({
  selector: 'app-detail-appraisal-modal',
  standalone: true,
  imports: [MatGridListModule],
  templateUrl: './detail-appraisal-modal.component.html',
  styleUrl: './detail-appraisal-modal.component.css'
})



export class DetailAppraisalModalComponent {
  detailData: any = {};
  constructor(public dialogRef: MatDialogRef<DetailAppraisalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.detailData = data;
    this.detailData.createdAt = new Date(this.data.createdAt).toLocaleDateString('en-GB')
    console.log("detail data ", this.detailData.createdAt)
  }

  tiles: Tile[] = [
    { text: 'One', imageOne: '', imageTwo: '', cols: 3, rows: 1, color: 'lightblue' },
    { text: 'Two', imageOne: this.detailData.urlImage1, imageTwo: '', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', imageOne: '', imageTwo: '', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', imageOne: '', imageTwo: '', cols: 2, rows: 1, color: '#DDBDF1' },
  ];

}
