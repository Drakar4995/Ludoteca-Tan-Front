import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { LoanPage } from './model/LoanPage';
import { LOAN_DATA } from './model/mock-loan';
import { Loan } from './model/Loan';
import { LOAN_DATA_LIST } from './model/mock-loans-list';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class LoanService {

   url = "http://localhost:8080/loan/";
  constructor(private http:HttpClient) {}

  getLoans(pageable:Pageable,gameId?:number,clientId?:number,date?:Date):Observable<LoanPage>{

    
    return this.http.post<LoanPage>(this.composeUrl(gameId,clientId,date),{pageable:pageable});
  }

  saveLoan(loan:Loan):Observable<Loan>{

    return this.http.put<Loan>(this.url,loan);
  }
  deleteLoan(idLoan:number):Observable<any>{
    return this.http.delete<any>(this.url+idLoan);
  }
  getAllLoan():Observable<void>{
    return of (null);
  }

  private composeUrl(gameId?:number,clientId?:number,date?:Date):string{
    
    let params= "";
    if(gameId!=null){
      params += "idGame="+gameId;
    }

    if(clientId !=null){
      if(params != "") params+="&";

      params+= "idClient="+clientId;
    }
    if(date!=null){
      if(params != "") params+="&";
      let formatedDate = moment(date).format("DD/MM/YYYY");
      params += "date="+formatedDate ;
    }
    let url = this.url;
    if(params=="") return url;
    else return url + '?' + params;
  }

}
