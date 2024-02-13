import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ubication } from '../../interfaces/ubication.interface';
import { UbicationService } from '../../services/ubication.service';


@Component({
  selector: 'app-ubication',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    FormsModule, MatFormFieldModule,
    CommonModule],
  templateUrl: './ubication.component.html',
  styleUrl: './ubication.component.css'
})
export class UbicationComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'code',
    'ubication',
    'detail',
    'actions'
  ];

  ubicationData: MatTableDataSource<ubication>;

  constructor(
    private _ubicationService: UbicationService) {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this._ubicationService.getAllUbications().subscribe((data: ubication[]) => {
      this.ubicationData = new MatTableDataSource(data)
      this.ubicationData.paginator = this.paginator
    })

  }

  ngAfterViewInit() {

    this.paginator._intl.itemsPerPageLabel = 'Articulos por pagina';

  }

  getAllUbications() {
    this._ubicationService.getAllUbications().subscribe((data: ubication[]) => {
      this.ubicationData = new MatTableDataSource<ubication>(data)

    })

  }

}

