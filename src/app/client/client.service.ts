import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Client } from './model/Client';
import {CLIENT_DATA} from './model/mock-Clients'
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  getClients(): Observable<Client[]>{
    return this.http.get<Client[]>('http://localhost:8080/clients');
  }
  deleteClient(idClient:number): Observable<any>{
    return this.http.delete('http://localhost:8080/clients/'+idClient);
  }

  saveClient(client:Client):Observable <Boolean> {
    let url = 'http://localhost:8080/clients';

    if(client.id!=null) url += '/'+client.id;

    return this.http.put<Boolean>(url,client);
  }
}
