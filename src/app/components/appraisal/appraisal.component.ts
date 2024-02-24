import { AppraisalArticleService } from './../../services/appraisal-article.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import {AsyncPipe} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditAppraisalModalComponent } from '../edit-appraisal-modal/edit-appraisal-modal.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Observable, Subscription, map, startWith } from 'rxjs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { PdfModalComponent } from '../pdf-modal/pdf-modal.component';
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
    ReactiveFormsModule,
    CommonModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatCheckboxModule],
  templateUrl: './appraisal.component.html',
  styleUrl: './appraisal.component.css'
})

export class AppraisalComponent implements AfterViewInit, OnInit, OnDestroy {
  selectedCount: number = 0
  ubicationData: ubication[] = []
  selectedUbication = new FormControl();
  displayedColumns: string[] = [
    'select',
    'codes',
    'ubication',
    'article',
    'subGroup',
    'detail',
    'state',
    'price'
  ];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'actions']
  columnsToDisplay: any[] = this.displayedColumns.slice();
  dataTasation: MatTableDataSource<appraisalArticle>;
  subscription: Subscription
  filteredOptions: Observable<ubication[]>;
  AppraisalSelected = new SelectionModel<appraisalArticle>(true, []);
  @ViewChild(MatPaginator, {static: false}) paginator : MatPaginator
  //  @ViewChild(MatPaginator, {static: false})
  //  set paginator (value: MatPaginator) {
  //    this.dataTasation.paginator = value;
  //  }

  constructor(
    private _ubicationService: UbicationService,
    public dialog: MatDialog,
    public _appraisalArticleService: AppraisalArticleService) {
      this.getAllUbications()
  }

  ngOnInit() {

    this.filteredOptions = this.selectedUbication.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.subscription = this._appraisalArticleService.appraisalData$.subscribe((data: appraisalArticle[]) => {
      this.dataTasation = new MatTableDataSource(data)
      this.dataTasation.paginator = this.paginator;
    })

  }

  ngOnDestroy() {
    this._appraisalArticleService.deleteAppraisalsData()
    this.subscription.unsubscribe()
  }
  ngAfterViewInit() {

    this.paginator!._intl.itemsPerPageLabel = 'Articulos por pagina';
  }
  getAllUbications() {
    this._ubicationService.getAllUbications().subscribe((data: ubication[]) => {
      this.ubicationData = data
    })

  }
  openDialog(appraisalData: appraisalArticle) {
    this.dialog.open(EditAppraisalModalComponent, {
      data: appraisalData
    });
  }
  openPdfModal() {
    this.dialog.open(PdfModalComponent, {
      data: {appraisals: this.AppraisalSelected.selected, ubication: this.selectedUbication.value}
    });
  }
  ischeckboxFullLength() {
    let pageIndex: number
    const numSelected = this.AppraisalSelected.selected.length;
    pageIndex = this.dataTasation.paginator?.pageIndex! * this.dataTasation.paginator?.pageSize!
    return numSelected === 30 || this.dataTasation.data.at(-1)?._id === this.AppraisalSelected.selected.at(-1)?._id;
  }
  masterToggle() {
    this.ischeckboxFullLength() ?
        this.AppraisalSelected.clear() : this.toggleSelection();
  }
  toggleSelection() {
    let pageIndex: number
    let lastIndex: number
    pageIndex = this.dataTasation.paginator?.pageIndex! * this.dataTasation.paginator?.pageSize!
    if ((pageIndex + 30) > this.dataTasation.data.length) {
      lastIndex = (this.dataTasation.data.length)
    } else {
      lastIndex = pageIndex + 30
    }
    for (let index = pageIndex; index < lastIndex; index++) {
      if( this.AppraisalSelected.selected.length < 30) {
        this.AppraisalSelected.select(this.dataTasation.data[index])
      }
    }
    this.selectedCount = this.AppraisalSelected.select.length
  }
  private _filter(filter: string): ubication[] {
    const filterValue = filter.toLocaleLowerCase();

    return this.ubicationData.filter(ubicationData => ubicationData.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().includes(filterValue) ||
    ubicationData.code.toLocaleLowerCase().toLocaleLowerCase().includes(filterValue));
  }
  getAllAppraisalsByUbication(selectedUbication: FormControl) {

    const ubicationSelected = this.ubicationData.filter(ubicationData => ubicationData.name.includes(selectedUbication.value))
    this._appraisalArticleService.getAllAppraisalsByUbication(ubicationSelected[0]._id)

  }

}
