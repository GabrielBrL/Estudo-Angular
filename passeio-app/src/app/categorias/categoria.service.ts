import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Categoria } from './categoria';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private _httpCliente: HttpClient) { }

  salvar(categoria: Categoria): Observable<Categoria> {
    return this._httpCliente.post<Categoria>(`${environment.apiUrl}/categorias`, categoria);
  }

  obterTodas(): Observable<Categoria[]> {
    return this._httpCliente.get<Categoria[]>(`${environment.apiUrl}/categorias`);
  }
}
