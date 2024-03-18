import { AppraisalArticleService } from './../../services/appraisal-article.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { appraisalArticle } from '../../interfaces/appraisal.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { UbicationService } from '../../services/ubication.service';
import { ubication } from '../../interfaces/ubication.interface';
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { EditAppraisalModalComponent } from '../edit-appraisal-modal/edit-appraisal-modal.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, Subscription, concatMap, forkJoin, map, startWith, tap } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { PdfModalComponent } from '../pdf-modal/pdf-modal.component';
import { DeleteAppraisalModalComponent } from '../delete-appraisal-modal/delete-appraisal-modal.component';
import { DetailAppraisalModalComponent } from '../detail-appraisal-modal/detail-appraisal-modal.component';
import { SubGroupService } from '../../services/sub-group.service';
import { subGroup } from '../../interfaces/subgroup.interface';
import { AutocompleteFilterComponent } from '../autocomplete-filter/autocomplete-filter.component';
import { ArticleService } from '../../services/article.service';
import { article } from '../../interfaces/article.interface';
const columns = [
  { columnName: 'Codigo de Tasacion', columnTag: 'appraisalCode' },
  { columnName: 'Viñeta', columnTag: 'bullet' },
  { columnName: 'Ubicacion', columnTag: 'ubication' },
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
    ReactiveFormsModule,
    CommonModule,
    DecimalPipe,
    MatAutocompleteModule,
    AsyncPipe,
    MatCheckboxModule,
    AutocompleteFilterComponent],
  templateUrl: './appraisal.component.html',
  styleUrl: './appraisal.component.css'
})

export class AppraisalComponent implements AfterViewInit, OnInit, OnDestroy {
  filterStateText: string = 'true'
  selectedCount: number = 0
  ubicationData: ubication[] = []
  subGroupData: subGroup[] = []
  articleData: article[] = []
  selectedUbication = new FormControl('');
  selectedArticle = new FormControl('');
  selectedSubGroup = new FormControl('');
  filterState: boolean = true;
  displayColumns: any[] = columns;
  displayedColumns: string[] = [
    'select',
    'appraisalCode',
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
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator

  constructor(
    private _ubicationService: UbicationService,
    private dialog: MatDialog,
    private _appraisalArticleService: AppraisalArticleService,
    private _subGroupService: SubGroupService,
    private _articleService: ArticleService) {
    this.getAllDatas()
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
  getAllDatas() {
    forkJoin(
      this._ubicationService.getAllUbications(),
      this._subGroupService.getAllSubGroups(),
      this._articleService.getAllArticles()
    ).subscribe(([ubications, subGroups, article]) => {
      this.ubicationData = ubications;
      this.subGroupData = subGroups;
      this.articleData = article;
  })
}
  getAllSubgroups() {
    this._subGroupService.getAllSubGroups().subscribe((data: subGroup[]) => {
      this.subGroupData = data
    })
  }

  filterByState(filter: boolean) {
    this.filterState = filter

    if(filter) {
      this.filterStateText = 'true'
      this.getAllAppraisalsByUbication()
    } else {
      this.filterStateText = 'false'
      this.getAllAppraisalsByUbication()
    }

  }
  openEditModal(appraisalData: appraisalArticle) {
    const editDialog = this.dialog.open(EditAppraisalModalComponent, {
      data: appraisalData
    });
    editDialog.afterClosed().subscribe((res) => {
      this.getAllAppraisalsByUbication()
    }
    )
  }
  openDetail(appraisalData: appraisalArticle) {
    this.dialog.open(DetailAppraisalModalComponent, {
      /* width: '80vw', // Set your desired width here
      height: '80vh', // Set your desired height here
      maxWidth: '100%', // Ensure modal doesn't exceed viewport width
      maxHeight: '100%', // Ensure modal doesn't exceed viewport height
      panelClass: 'custom-modal-container', // Add custom class for styling */
      data: appraisalData
    });
  }
  openDeleteModal(appraisalData: appraisalArticle) {
    const deleteDialog = this.dialog.open(DeleteAppraisalModalComponent, {
      data: appraisalData
    });
    deleteDialog.afterClosed().subscribe((res) => {
      this.getAllAppraisalsByUbication()
    }
    )
  }
  openPdfModal() {
    this.dialog.open(PdfModalComponent, {
      data: { appraisals: this.AppraisalSelected.selected, ubication: this.selectedUbication.value }
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
      if (this.AppraisalSelected.selected.length < 30) {
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
  getAllAppraisalsByUbication() {
    this.AppraisalSelected.clear()

    const ubicationSelected = this.selectedUbication.value != "" ? this.ubicationData.filter(ubicationData => ubicationData.name.includes(this.selectedUbication.value!))[0]._id : ""
    const subGroupSelected = this.selectedSubGroup.value != "" ? this.subGroupData.filter(subGroupData => subGroupData.name.includes(this.selectedSubGroup.value!))[0]._id : ""
    const articleSelected = this.selectedArticle.value != "" ? this.articleData.filter(articleData => articleData.name.includes(this.selectedArticle.value!))[0]._id : ""

    this._appraisalArticleService.getAllAppraisalsQueryParams(subGroupSelected, ubicationSelected, articleSelected, this.filterStateText)

  }

}
