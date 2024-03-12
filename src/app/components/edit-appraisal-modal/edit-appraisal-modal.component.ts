import { AppraisalArticleService } from './../../services/appraisal-article.service';
import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UbicationService } from '../../services/ubication.service';
import { StateService } from '../../services/state.service';
import { ArticleService } from '../../services/article.service';
import { SubGroupService } from '../../services/sub-group.service';
import { ubication } from '../../interfaces/ubication.interface';
import { state } from '../../interfaces/state.interface';
import { article } from '../../interfaces/article.interface';
import { subGroup } from '../../interfaces/subgroup.interface';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { forkJoin, map, startWith} from 'rxjs';
import {AsyncPipe, CommonModule} from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { AutocompleteFilterComponent } from '../autocomplete-filter/autocomplete-filter.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ToastrService } from 'ngx-toastr';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-edit-appraisal-modal',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule,
    MatMenuModule,
    MatSelectModule,
    AutocompleteFilterComponent,
    MatSlideToggleModule],
  templateUrl: './edit-appraisal-modal.component.html',
  styleUrl: './edit-appraisal-modal.component.css'
})
export class EditAppraisalModalComponent implements OnInit{

  selectedUbication: FormControl
  selectedArticle: FormControl
  selectedSubGroup: FormControl
  ubicationData: ubication[] = []
  articleData: article[] = []
  stateData: state[] = []
  subGroupData: subGroup[] = []
  AppraisalArticleData: FormGroup
  constructor(public dialogRef: MatDialogRef<EditAppraisalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private _ubicationService: UbicationService,
    private _stateService: StateService,
    private _articleService: ArticleService,
    private _subGroupService: SubGroupService,
    private _appraisalArticleService: AppraisalArticleService,
    private fb: FormBuilder) {
    this.selectedUbication = new FormControl(data.ubication?.name)
    this.selectedArticle = new FormControl(data.article?.name)
    this.selectedSubGroup = new FormControl(data.subGroup?.name)
    this.AppraisalArticleData = this.fb.group({
      appraisalCode: [data.appraisalCode, Validators.required],
      code: [data.code, Validators.required],
      bullet: [data.bullet, Validators.required],
      date: [{value: data.date.split('T')[0], disabled: true}, Validators.required],
      detail: [data.detail, Validators.required],
      description: [data.description, Validators.required],
      ubication: [data.ubication._id, Validators.required],
      article: [data.article?._id, Validators.required],
      state: [data.state?._id, Validators.required],
      subGroup: [data.subGroup?._id, Validators.required],
      vre: [data.vre, Validators.required],
      vr: [data.vr, Validators.required],
      ant: [data.ant, Validators.required],
      vexp: [data.vexp, Validators.required],
      K1a: [{value: data.K1a, disabled: true}, Validators.required],
      Va: [{value: data.Va, disabled: true}, Validators.required],
      replacementValue: [data.replacementValue, Validators.required],
      isPC: [data.isPC, Validators.required],
      useFormule: [data.useFormule, Validators.required]
    })
  }
  ngOnInit(): void {
    this.getAllDatas()
  }
  changeK2() {
    const state = this.AppraisalArticleData.get('state')?.value
    const k2 = this.stateData.find(data => data._id.includes(state))
    this.AppraisalArticleData.get('k2')?.setValue(k2?.k2)
    this.calcVa()
  }
  calcVr() {
    const vre = this.AppraisalArticleData.get('vre')?.value
    this.AppraisalArticleData.get('vr')?.setValue(0.1 * vre)
    this.calcVa()
  }
  calcVa() {
    const vre = this.AppraisalArticleData.get('vre')?.value
    const vr = this.AppraisalArticleData.get('vr')?.value
    const k1a = this.AppraisalArticleData.get('K1a')?.value
    const state = this.AppraisalArticleData.get('state')?.value
    const k2 = this.stateData.find(data => data._id.includes(state))
    this.AppraisalArticleData.get('Va')?.setValue((vre - (vre - vr)* k1a )* k2!.k2 )
  }
  calcK1a() {
    const ant = this.AppraisalArticleData.get('ant')?.value
    const vexp = this.AppraisalArticleData.get('vexp')?.value
    this.AppraisalArticleData.get('K1a')?.setValue( ant/ (ant+vexp) )
    this.calcVa()
  }
  updateAppraisal() {
    const ubicationId = this.filterSelectedData(this.ubicationData, this.selectedUbication.value === "" ? this.data.ubication.name : this.selectedUbication.value)._id
    const articleId = this.filterSelectedData(this.articleData, this.selectedArticle.value === "" ? this.data.article.name : this.selectedArticle.value)._id
    const subGroupId = this.filterSelectedData(this.subGroupData, this.selectedSubGroup.value === "" ? this.data.subGroup.name : this.selectedSubGroup.value)._id
    this.AppraisalArticleData.get('ubication')?.setValue(ubicationId)
    this.AppraisalArticleData.get('article')?.setValue(articleId)
    this.AppraisalArticleData.get('subGroup')?.setValue(subGroupId)
    const appraisalArticleUpdate = this.AppraisalArticleData.getRawValue()

    this._appraisalArticleService.updateAppraisal(appraisalArticleUpdate, this.data._id).subscribe({
      next: data => {
        this.toastr.success(data.message, 'Felicidades');
        this.dialogRef.close()
      },
      error: error => {
        this.toastr.error(error.error.errors[0], 'Error');
    }
    })

  }
  filterSelectedData(data: any, selectedData: any) {
    return data.find((data: any) => data.name.includes(selectedData))
  }
  getAllDatas() {
    forkJoin(
      this._ubicationService.getAllUbications(),
      this._articleService.getAllArticles(),
      this._stateService.getAllStates(),
      this._subGroupService.getAllSubGroups(),
    ).subscribe(([ubications, articles, states, subGroups]) => {
      this.ubicationData = ubications;
      this.articleData = articles;
      this.stateData = states;
      this.subGroupData = subGroups;
  })

  }
  cancelClick(): void {
    this.dialogRef.close();
  }
}
