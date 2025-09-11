import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router'
import 'primeicons/primeicons.css';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-consulta',
  imports: [
    ButtonModule,
    CommonModule,
    InputTextModule,
    CardModule,
    FlexLayoutModule,
    TableModule,
    FormsModule,
    FloatLabelModule,
    ToastModule,
    ConfirmPopupModule,
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class ConsultaComponent implements OnInit {
  pesquisa: string = "";
  clientes: Cliente[] = [];

  constructor(private _clienteService: ClienteService,
    private _router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.clientes = this._clienteService.getClientes();
  }

  pesquisaClientes() {
    const resultPesquisa = this._clienteService.getClienteByName(this.pesquisa);
    this.clientes = resultPesquisa;
  }

  selecionarCliente(cliente: Cliente) {
    this._router.navigate(['/cadastro'], { queryParams: { "idUsuario": cliente.id } });
  }

  deletarCliente(event: Event, cliente: Cliente) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Deseja deletar esse cliente?',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Não',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Sim'
      },
      accept: () => {
        this.clientes = this._clienteService.deletarCliente(cliente);
        this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Deletado com sucesso', life: 3000 });
      }
    });
  }
}
