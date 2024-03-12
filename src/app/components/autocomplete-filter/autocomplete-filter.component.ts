import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { ubication } from '../../interfaces/ubication.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-autocomplete-filter',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe],
  templateUrl: './autocomplete-filter.component.html',
  styleUrl: './autocomplete-filter.component.css'
})
export class AutocompleteFilterComponent implements OnInit{
  @Input() control = new FormControl();
  @Input() data: any[] = []
  @Input() Label: string
  @Input() placeholder: string
  filteredOptions: Observable<any[]>
  constructor() {
    this.filteredOptions
  }
  ngOnInit(): void {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(filter: string): any[] {

    const filterValue = filter.toLocaleLowerCase();

    return this.data.filter(data => data.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().includes(filterValue));
  }
}
