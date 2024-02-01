import { article } from "./article.interface"
import { subGroup } from "./subgroup.interface"
import { state } from "./state.interface"

export interface appraisalArticle {
    _id: string,
    appraisalCode: string,
    code: string,
    bullet : string,
    date : Date,
    ubication : string,
    article : article,
    subGroup : subGroup,
    detail : string,
    description : string,
    vre : number,
    vr : number,
    ant : number,
    vexp : number,
    state : state,
    urlImage1 : string,
    urlImage2 : string,
    createdAt : Date,
    updatedAt : Date
}
