import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lugar } from './lugar';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LugarService {

  constructor(private _httpCliente: HttpClient) {

  }

  salvar(categoria: Lugar): Observable<Lugar> {
    return this._httpCliente.post<Lugar>(`${environment.apiUrl}/lugares`, categoria);
  }

  obterTodas(): Observable<Lugar[]> {
    return this._httpCliente.get<Lugar[]>(`${environment.apiUrl}/lugares`);
  }

  filtrar(nome?: string, categoria?: string): Observable<Lugar[]> {
    var params = new HttpParams();
    if (nome)
      params = params.set("nome_like", nome);
    if (categoria && categoria != "-1")
      params = params.set("categoria", categoria);
    return this._httpCliente.get<Lugar[]>(`${environment.apiUrl}/lugares`, {
      params: params
    });
  }
}
