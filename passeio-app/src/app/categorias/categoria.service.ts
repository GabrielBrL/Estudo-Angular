import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Categoria } from './categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private _httpCliente: HttpClient) { }

  salvar(categoria: Categoria): Observable<Categoria> {
    return this._httpCliente.post<Categoria>('http://localhost:3000/categorias', categoria);
  }

  obterTodas(): Observable<Categoria[]> {
    return this._httpCliente.get<Categoria[]>('http://localhost:3000/categorias');
  }
}
