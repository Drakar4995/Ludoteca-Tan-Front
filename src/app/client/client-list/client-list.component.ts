import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Client } from '../model/Client';
import { ClientEditComponent } from '../client-edit/client-edit.component';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit{

  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'action'];
   //Se declara e inicializan los parametros al usar el private, protected
   //Nos ahorramos el 
   //CategoryService categoryService ;
   //this.categoryService = categoryService
  constructor(
    private clientService:ClientService,
    public dialog: MatDialog,
    ){}
  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      categories => this.dataSource.data = categories
    );
  }
  createClient(){
    const dialogRef = this.dialog.open(ClientEditComponent,{
      data:{}
    });
    
    dialogRef.afterClosed().subscribe( result =>{
      this.ngOnInit();
    });
  }
  editClient(client: Client) {
    const dialogRef = this.dialog.open(ClientEditComponent, {
      data: { client: client }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  deleteClient(client: Client) {    
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: { title: "Eliminar Cliente", description: "Atención si borra el Cliente se perderán sus datos.<br> ¿Desea eliminar el Cliente?" }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(client.id).subscribe(result => {
          this.ngOnInit();
        }); 
      }
    });
  } 
}
