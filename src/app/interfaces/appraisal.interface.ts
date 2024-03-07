import { article } from "./article.interface"
import { subGroup } from "./subgroup.interface"
import { state } from "./state.interface"
import { ubication } from "./ubication.interface"

export interface appraisalArticle {
    _id: string,
    appraisalCode: string,
    code: string,
    bullet : string,
    date : Date,
    ubication : ubication,
    article : article,
    subGroup : subGroup,
    detail : string,
    description : string,
    vre : number,
    vr : number,
    ant : number,
    vexp : number,
    K1a : number,
    Va : number,
    replacementValue : number,
    state : state,
    urlImage1 : string,
    urlImage2 : string,
    createdAt : Date,
    updatedAt : Date,
    isChecked : boolean,
    isPC : boolean,
    useFormule : boolean
}

export interface updateAppraisal {
  appraisalCode: string,
  code: string,
  bullet : string,
  date : Date,
  ubication : string,
  article : string,
  subGroup : string,
  detail : string,
  description : string,
  vre : number,
  vr : number,
  ant : number,
  vexp : number,
  K1a : number,
  Va : number,
  replacementValue : number,
  state : string,
  urlImage1 : string,
  urlImage2 : string,
  createdAt : Date,
  updatedAt : Date,
  isChecked : boolean,
  isPC : boolean,
  useFormule : boolean
}
