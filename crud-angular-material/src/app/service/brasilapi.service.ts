import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estado, Municipio } from '../model/brasilapi';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrasilapiService {

  constructor(private _httpClient: HttpClient) { }

  getEstados(): Observable<Estado[]> {
    var resultRequest = this._httpClient.get<Estado[]>("https://brasilapi.com.br/api/ibge/uf/v1");
    return resultRequest;
  }

  getMunicipios(estado: string): Observable<Municipio[]> {
    var resultRequest = this._httpClient.get<Municipio[]>(`https://brasilapi.com.br/api/ibge/municipios/v1/${estado}?providers=dados-abertos-br,gov,wikipedia`);
    return resultRequest;
  }
}
