import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lugar } from './lugar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  constructor(private _httpCliente: HttpClient) {

  }

  salvar(categoria: Lugar): Observable<Lugar> {
    return this._httpCliente.post<Lugar>('http://localhost:3000/lugares', categoria);
  }

  obterTodas(): Observable<Lugar[]> {
    return this._httpCliente.get<Lugar[]>('http://localhost:3000/lugares');
  }

  filtrar(nome?: string, categoria?: string): Observable<Lugar[]> {
    var params = new HttpParams();
    if (nome)
      params = params.set("nome_like", nome);
    if (categoria && categoria != "-1")
      params = params.set("categoria", categoria);
    return this._httpCliente.get<Lugar[]>('http://localhost:3000/lugares', {
      params: params
    });
  }
}
