import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/model/Client';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';
import * as moment from 'moment';
import { InvalidDateException } from 'src/app/core/exception/InvalidDateException';
import {ExistsLoanException} from 'src/app/core/exception/ExistsLoanException';
@Component({
  selector: 'app-loan-edit',
  templateUrl: './loan-edit.component.html',
  styleUrls: ['./loan-edit.component.scss'],
})
export class LoanEditComponent implements OnInit {
  loan: Loan;
  selectedGame: Game;
  selectedClient: Client;
  selectedStartDate: Date;
  selectedEndDate: Date;
  moment = moment;
  games: Game[];
  clients: Client[];

  errorMessage: string;

  constructor(
    public dialogRef: MatDialogRef<LoanEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private loanService: LoanService,
  ) {}
  onClose() {
    this.dialogRef.close();
  }
  onSave() {
  
    if(this.loan.client!=null && this.loan.game!=null && this.loan.startDate!=null && this.loan.endDate){
     
      this.loanService.saveLoan(this.loan).subscribe(
        (result)=>{
          this.dialogRef.close();
        },
        (error)=>
        {
          this.errorMessage=error.error.message;
        }
      );
    }else{
      this.errorMessage = "Debes de rellenar todos los campos"
    }
    
  }
  ngOnInit(): void {
    this.loan = new Loan();
    this.games = this.data.games;
    this.clients = this.data.clients;
    this.errorMessage = null;
  }

  // validateDate() {
  //   const difference = Math.abs((moment(this.selectedEndDate).toDate()).getTime() - (moment(this.selectedStartDate).toDate()).getTime());
  //   const differenceInDays = Math.ceil(difference / (1000 * 60 * 60 * 24));
  //   return differenceInDays <= 14;
  // }
  
  public resetEndDate() {
    this.loan.endDate = null;
    //console.log(this.loan.startDate);
  }
}
