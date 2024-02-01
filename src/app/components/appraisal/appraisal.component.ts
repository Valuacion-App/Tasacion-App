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
const ELEMENT_DATA: appraisalArticle[] = [
  {
    _id : "659d5924e45484d04d8fff45",
    appraisalCode : "TAS11111",
    code: "AS0000",
    bullet: "000512",
    date: new Date("2024-01-09T04:00:00.000Z"),
    ubication: "null",
    article: {
        _id: "6594f21fc5125a80cd1cfed1",
        name: "Articulo esditado"
    },
    subGroup: {
        _id: "659643909f385b4801a1c1fd",
        name: "sub-grupo nuevo"
    },
    detail: "detalle",
    description: "descripcion",
    vre: 10,
    vr: 5,
    ant: 200,
    vexp: 100,
    state: {
        _id: "658badde3f568e2fb7e51bba",
        name: "Estado modificado 2"
    },
    urlImage1 : "https://adalo-uploads.imgix.net/2bb57c13287fe27b6e76b0bf3a78dfad3b654fb049d2d9ef5b1cfdbfa5679b46.jpg",
    urlImage2: "https://adalo-uploads.imgix.net/2bb57c13287fe27b6e76b0bf3a78dfad3b654fb049d2d9ef5b1cfdbfa5679b46.jpg",
    createdAt : new Date("2024-01-09T14:33:08.475Z"),
    updatedAt : new Date("2024-01-09T14:36:14.332Z")
  },
  {
      _id: "659daec937c0c6470bd75337",
      appraisalCode: "TAS0000",
      code: "AS0000",
      bullet: "000512",
      date: new Date("2024-01-09T04:00:00.000Z"),
      ubication: "null",
      article: {
          _id: "6594f21fc5125a80cd1cfed1",
          name: "Articulo esditado"
      },
      subGroup: {
          _id: "659643909f385b4801a1c1fd",
          name: "sub-grupo nuevo"
      },
      detail: "detalle",
      description: "descripcion",
      vre: 10,
      vr: 5,
      ant: 200,
      vexp: 100,
      state: {
          _id: "658badde3f568e2fb7e51bba",
          name: "Estado modificado 2"
      },
      urlImage1: "https://adalo-uploads.imgix.net/2bb57c13287fe27b6e76b0bf3a78dfad3b654fb049d2d9ef5b1cfdbfa5679b46.jpg",
      urlImage2: "https://adalo-uploads.imgix.net/2bb57c13287fe27b6e76b0bf3a78dfad3b654fb049d2d9ef5b1cfdbfa5679b46.jpg",
      createdAt: new Date("2024-01-09T20:38:33.302Z"),
      updatedAt: new Date("2024-01-09T20:38:33.302Z")
  },
  {
    _id: "659daec937c0c6470bd75337",
    appraisalCode: "TAS0000",
    code: "AS0000",
    bullet: "000512",
    date: new Date("2024-01-09T04:00:00.000Z"),
    ubication: "null",
    article: {
        _id: "6594f21fc5125a80cd1cfed1",
        name: "Articulo esditado"
    },
    subGroup: {
        _id: "659643909f385b4801a1c1fd",
        name: "sub-grupo nuevo"
    },
    detail: "detalle",
    description: "descripcion",
    vre: 10,
    vr: 5,
    ant: 200,
    vexp: 100,
    state: {
        _id: "658badde3f568e2fb7e51bba",
        name: "Estado modificado 2"
    },
    urlImage1: "https://adalo-uploads.imgix.net/2bb57c13287fe27b6e76b0bf3a78dfad3b654fb049d2d9ef5b1cfdbfa5679b46.jpg",
    urlImage2: "https://adalo-uploads.imgix.net/2bb57c13287fe27b6e76b0bf3a78dfad3b654fb049d2d9ef5b1cfdbfa5679b46.jpg",
    createdAt: new Date("2024-01-09T20:38:33.302Z"),
    updatedAt: new Date("2024-01-09T20:38:33.302Z")
},
{
  _id: "659daec937c0c6470bd75337",
  appraisalCode: "TAS0000",
  code: "AS0000",
  bullet: "000512",
  date: new Date("2024-01-09T04:00:00.000Z"),
  ubication: "null",
  article: {
      _id: "6594f21fc5125a80cd1cfed1",
      name: "Articulo esditado"
  },
  subGroup: {
      _id: "659643909f385b4801a1c1fd",
      name: "sub-grupo nuevo"
  },
  detail: "detalle",
  description: "descripcion",
  vre: 10,
  vr: 5,
  ant: 200,
  vexp: 100,
  state: {
      _id: "658badde3f568e2fb7e51bba",
      name: "Estado modificado 2"
  },
  urlImage1: "https://adalo-uploads.imgix.net/2bb57c13287fe27b6e76b0bf3a78dfad3b654fb049d2d9ef5b1cfdbfa5679b46.jpg",
  urlImage2: "https://adalo-uploads.imgix.net/2bb57c13287fe27b6e76b0bf3a78dfad3b654fb049d2d9ef5b1cfdbfa5679b46.jpg",
  createdAt: new Date("2024-01-09T20:38:33.302Z"),
  updatedAt: new Date("2024-01-09T20:38:33.302Z")
},
{
  _id: "659daec937c0c6470bd75337",
  appraisalCode: "TAS0000",
  code: "AS0000",
  bullet: "000512",
  date: new Date("2024-01-09T04:00:00.000Z"),
  ubication: "null",
  article: {
      _id: "6594f21fc5125a80cd1cfed1",
      name: "Articulo esditado"
  },
  subGroup: {
      _id: "659643909f385b4801a1c1fd",
      name: "sub-grupo nuevo"
  },
  detail: "detalle",
  description: "descripcion",
  vre: 10,
  vr: 5,
  ant: 200,
  vexp: 100,
  state: {
      _id: "658badde3f568e2fb7e51bba",
      name: "Estado modificado 2"
  },
  urlImage1: "https://adalo-uploads.imgix.net/2bb57c13287fe27b6e76b0bf3a78dfad3b654fb049d2d9ef5b1cfdbfa5679b46.jpg",
  urlImage2: "https://adalo-uploads.imgix.net/2bb57c13287fe27b6e76b0bf3a78dfad3b654fb049d2d9ef5b1cfdbfa5679b46.jpg",
  createdAt: new Date("2024-01-09T20:38:33.302Z"),
  updatedAt: new Date("2024-01-09T20:38:33.302Z")
},
{
  _id: "659daec937c0c6470bd75337",
  appraisalCode: "TAS0000",
  code: "AS0000",
  bullet: "000512",
  date: new Date("2024-01-09T04:00:00.000Z"),
  ubication: "null",
  article: {
      _id: "6594f21fc5125a80cd1cfed1",
      name: "Articulo esditado"
  },
  subGroup: {
      _id: "659643909f385b4801a1c1fd",
      name: "sub-grupo nuevo"
  },
  detail: "detalle",
  description: "descripcion",
  vre: 10,
  vr: 5,
  ant: 200,
  vexp: 100,
  state: {
      _id: "658badde3f568e2fb7e51bba",
      name: "Estado modificado 2"
  },
  urlImage1: "https://adalo-uploads.imgix.net/2bb57c13287fe27b6e76b0bf3a78dfad3b654fb049d2d9ef5b1cfdbfa5679b46.jpg",
  urlImage2: "https://adalo-uploads.imgix.net/2bb57c13287fe27b6e76b0bf3a78dfad3b654fb049d2d9ef5b1cfdbfa5679b46.jpg",
  createdAt: new Date("2024-01-09T20:38:33.302Z"),
  updatedAt: new Date("2024-01-09T20:38:33.302Z")
},
{
  _id: "659daec937c0c6470bd75337",
  appraisalCode: "TAS0000",
  code: "AS0000",
  bullet: "000512",
  date: new Date("2024-01-09T04:00:00.000Z"),
  ubication: "null",
  article: {
      _id: "6594f21fc5125a80cd1cfed1",
      name: "Articulo esditado"
  },
  subGroup: {
      _id: "659643909f385b4801a1c1fd",
      name: "sub-grupo nuevo"
  },
  detail: "detalle",
  description: "descripcion",
  vre: 10,
  vr: 5,
  ant: 200,
  vexp: 100,
  state: {
      _id: "658badde3f568e2fb7e51bba",
      name: "Estado modificado 2"
  },
  urlImage1: "https://adalo-uploads.imgix.net/2bb57c13287fe27b6e76b0bf3a78dfad3b654fb049d2d9ef5b1cfdbfa5679b46.jpg",
  urlImage2: "https://adalo-uploads.imgix.net/2bb57c13287fe27b6e76b0bf3a78dfad3b654fb049d2d9ef5b1cfdbfa5679b46.jpg",
  createdAt: new Date("2024-01-09T20:38:33.302Z"),
  updatedAt: new Date("2024-01-09T20:38:33.302Z")
}

];

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
  selectedUbicationId: string;
  displayColumns: any[] = columns;
  displayedColumns: string[] = [
    'appraisalCode',
    'bullet',
    'ubication',
  ];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'actions']
  columnsToDisplay: any[] = this.displayedColumns.slice();
  dataTasation: MatTableDataSource<appraisalArticle>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _ubicationService: UbicationService,
    public dialog: MatDialog,
    private _appraisalArticleService: AppraisalArticleService) {

  }

  openDialog(appraisalData: appraisalArticle) {
    this.dialog.open(EditAppraisalModalComponent, {
      data: appraisalData
    });
  }
  ngOnInit() {
    this.getAllUbications()
    //this.getAllAppraisals()

  }

  ngAfterViewInit() {
    this.paginator._intl.itemsPerPageLabel = 'Articulos por pagina';
  }
  getAllAppraisals() {
    this._appraisalArticleService.getAllAppraisals().subscribe((data: appraisalArticle[]) => {
      console.log(data);
      this.dataTasation = new MatTableDataSource(data)
      this.dataTasation.paginator = this.paginator
    })
  }
  getAllUbications() {
    this._ubicationService.getAllUbications().subscribe((data: ubication[]) => {
      this.ubicationData = data

    })
  }
  getAllAppraisalsByUbication(ubicationId: string) {

    this._appraisalArticleService.getAllAppraisalsByUbication(ubicationId).subscribe((data: appraisalArticle[]) => {
      console.log(data);

      this.dataTasation = new MatTableDataSource(data)
      this.dataTasation.paginator = this.paginator
    })
  }

  showElement(element: any) {
    console.log(element);

  }
}
