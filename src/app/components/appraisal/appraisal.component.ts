import { AppraisalArticleService } from './../../services/appraisal-article.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { appraisalArticle } from '../../interfaces/appraisal.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { UbicationService } from '../../services/ubication.service';
import { ubication } from '../../interfaces/ubication.interface';
import {MatSelectModule} from '@angular/material/select';
import { EmpFilter } from '../../interfaces/filter.interface';
import { MatDialog } from '@angular/material/dialog';
import { EditAppraisalModalComponent } from '../edit-appraisal-modal/edit-appraisal-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const columns = [
  { columnName: 'Codigo de Tasacion', columnTag: 'appraisalCode' },
  { columnName: 'Viñeta', columnTag: 'bullet' },
  { columnName: 'Ubicacion', columnTag: 'ubication' },
  //{ columnName: 'Articulo', columnTag: 'article.name' },
  //{ columnName: 'Sub Grupo', columnTag: 'subGroup.name' },
];
@Component({
  selector: 'app-appraisal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    FormsModule, MatFormFieldModule,
    CommonModule],
  templateUrl: './appraisal.component.html',
  styleUrl: './appraisal.component.css'
})

export class AppraisalComponent implements AfterViewInit, OnInit {
  ubicationData: ubication[] = []
  selectedUbicationId: string = "";
  displayColumns: any[] = columns;
  displayedColumns: string[] = [
    'appraisalCode',
    'bullet',
    'ubication',
  ];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'actions']
  columnsToDisplay: any[] = this.displayedColumns.slice();
  dataTasation: MatTableDataSource<appraisalArticle>;

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    console.log(value);

    this.dataTasation.paginator = value;
  }

  constructor(
    private _ubicationService: UbicationService,
    public dialog: MatDialog,
    public _appraisalArticleService: AppraisalArticleService) {

  }

  openDialog(appraisalData: appraisalArticle) {
    this.dialog.open(EditAppraisalModalComponent, {
      data: appraisalData
    });
  }
  ngOnInit() {
    console.log(this._appraisalArticleService.appraisalData$);

    this._appraisalArticleService.appraisalData$.subscribe((data: appraisalArticle[]) => {
      this.dataTasation = new MatTableDataSource(data)
    })
    this.getAllUbications()
  }

  ngAfterViewInit() {

    this.paginator._intl.itemsPerPageLabel = 'Articulos por pagina';

  }
  getAllUbications() {
    this._ubicationService.getAllUbications().subscribe((data: ubication[]) => {
      this.ubicationData = data

    })

  }
  getAllAppraisalsByUbication(ubicationId: string) {

    this._appraisalArticleService.getAllAppraisalsByUbication(ubicationId)
    /*this._appraisalArticleService.getAllAppraisalsByUbication(ubicationId).subscribe((data: appraisalArticle[]) => {
      console.log(data);

      this.dataTasation = new MatTableDataSource(data)
      this.dataTasation.paginator = this.paginator
    })*/
  }

}
