import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms'
import { ButtonModule } from "primeng/button";
import { FlexLayoutModule } from '@angular/flex-layout';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'
import { ClienteService } from '../service/cliente.service';
import { Cliente } from './cliente';
import { Estado, Municipio } from '../model/brasilapi';
import { BrasilapiService } from '../service/brasilapi.service';

@Component({
  selector: 'app-cadastro',
  imports: [ButtonModule, FormsModule, CardModule,
    FlexLayoutModule, FloatLabelModule,
    InputTextModule,
    NgxMaskDirective,
    Select],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
  providers: [provideNgxMask()]
})
export class CadastroComponent implements OnInit {
  idUsuario?: string;
  cliente: Cliente = Cliente.newCliente();
  estados?: Estado[];
  municipios?: Municipio[];

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _clienteService: ClienteService,
    private _brasilApiService: BrasilapiService) {

  }
  ngOnInit(): void {
    this._route.queryParamMap.subscribe((param: any) => {
      this.idUsuario = param["params"]["idUsuario"];
      this.cliente = Cliente.newCliente();
    });
    if (this.idUsuario) {
      this.cliente = this._clienteService.getCliente(this.idUsuario) || Cliente.newCliente();
      if (this.cliente.estado) {
        this.getMunicipios(this.cliente.estado);
      }
    }
    this.getEstados();
  }

  setEstado(estado: any) {
    this.municipios = [];
    this.cliente.municipio = undefined;
    this._brasilApiService.getMunicipios(estado).subscribe(
      {
        next: (municipios) => this.municipios = municipios,
        error: (erro) => console.log(erro)
      });

  }

  getEstados() {
    this._brasilApiService.getEstados().subscribe(
      {
        next: (estados) => {
          this.estados = estados.sort((a, b) => a.nome.localeCompare(b.nome))
        },
        error: (erro) => console.log(erro)
      });
  }

  getMunicipios(estado: string) {
    this._brasilApiService.getMunicipios(estado).subscribe(
      {
        next: (municipios) => this.municipios = municipios,
        error: (erro) => console.log(erro)
      });
  }


  salvarCliente() {
    if (!this.idUsuario) {
      this._clienteService.criarCliente(this.cliente);
      this.cliente = Cliente.newCliente();
      this._router.navigate(['/consulta']);
    }
    else
      this._clienteService.atualizaCliente(this.cliente);
  }
}
