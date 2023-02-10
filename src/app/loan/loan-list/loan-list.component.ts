import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from 'src/app/client/client.service';
import { Client } from 'src/app/client/model/Client';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { GameService } from 'src/app/game/game.service';
import { Game } from 'src/app/game/model/Game';
import { LoanEditComponent } from '../loan-edit/loan-edit.component';
import { LoanService } from '../loan.service';
import { Loan } from '../model/Loan';
@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.scss'],
})
export class LoanListComponent implements OnInit {
  pageNumber: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource = new MatTableDataSource<Loan>();
  displayedColumns: string[] = ['id', 'name','game', 'startDate', 'endDate', 'action'];

  //Filtrado
  filterClient: Client;
  filterGame: Game;
  filterDate:Date;
  //ComboBOX
  clients: Client[];
  games: Game[];
  constructor(
    private loanService: LoanService,
    private clientService: ClientService,
    private gameService: GameService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.gameService.getGames().subscribe((games) => {
      this.games = games;
    });
    this.clientService
      .getClients()
      .subscribe((clients) => (this.clients = clients));
    this.loadPage();
  }

  loadPage(event?: PageEvent) {
    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };

    if (event != null) {
      pageable.pageSize = event.pageSize;
      pageable.pageNumber = event.pageIndex;
    }
    let gameId = this.filterGame != null ? this.filterGame.id : null;
    let clientId = this.filterClient != null ? this.filterClient.id :null;
    let date  = this.filterDate;
    this.loanService.getLoans(pageable,gameId,clientId,date).subscribe((data) => {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;


    });
  }

  onCleanFilter(): void {
    this.filterClient = null;
    this.filterGame = null;
    this.filterDate = null;
    this.onSearch();
  }

  onSearch(): void {
    let gameId = this.filterGame != null ? this.filterGame.id : null;
    let clientId = this.filterClient != null ? this.filterClient.id :null;
    let date  = this.filterDate;
    
    let pageable: Pageable = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      sort: [
        {
          property: 'id',
          direction: 'ASC',
        },
      ],
    };

    this.loanService.getLoans(pageable,gameId,clientId,date).subscribe((data)=>
    {
      this.dataSource.data = data.content;
      this.pageNumber = data.pageable.pageNumber;
      this.pageSize = data.pageable.pageSize;
      this.totalElements = data.totalElements;

    });
  }
  createLoan() {
    let sendData = { games: this.games, clients: this.clients ,loans:this.dataSource.data};

    const dialogRef = this.dialog.open(LoanEditComponent, { data: sendData});
    dialogRef.afterClosed().subscribe((result) => {
      this.ngOnInit();
    });
  }

  // editLoan(loan: Loan) {
  //   const dialogRef = this.dialog.open(LoanEditComponent, {
  //     data: { loan: loan },
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     this.ngOnInit();
  //   });
  // }

  deleteLoan(loan: Loan) {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: {
        title: 'Eliminar Prestamo',
        description:
          'Atención si borra el prestamo se perderán sus datos.<br> ¿Desea eliminar el Prestamo?',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loanService.deleteLoan(loan.id).subscribe((result) => {
          this.ngOnInit();
        });
      }
    });
  }
  // formatDate(date: Date): string {
  //   return moment(date).format('DD/MM/YYYY');
  // }
}
