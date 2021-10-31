import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES);
    //return this.http.get(this.urlEndPoint).pipe(map(response => response as Cliente[]));
    const headers = new HttpHeaders();

    headers.set('Access-Control-Allow-Origin',  'http://localhost:8080/api/clientes');

    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

}
