import { Injectable } from '@angular/core';
import { Cliente } from '../cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  static REPO_CLIENTES = "_CLIENTES";

  constructor() { }

  getClientes(): Cliente[] {
    const repoClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if (repoClientes) {
      const clientes: Cliente[] = JSON.parse(repoClientes);
      return clientes;
    }
    return [];
  }

  getCliente(id: string): Cliente | null {
    const repoClientes = this.getClientes();
    if (repoClientes) {
      return repoClientes.find(x => x.id == id) || null;
    }
    return null;
  }

  getClienteByName(name: string): Cliente[] {
    const repoClientes = this.getClientes();
    if (repoClientes) {
      if (name)
        return repoClientes.filter(x => x.nome?.includes(name));
      return repoClientes;
    }
    return [];
  }

  criarCliente(cliente: Cliente) {
    const clientes: Cliente[] = this.getClientes();
    clientes.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
  }
  atualizaCliente(cliente: Cliente) {
    var clientes = this.getClientes();
    var usuarioAntigo = this.getCliente(cliente.id!);
    if (usuarioAntigo) {
      usuarioAntigo.cpf = cliente.cpf;
      usuarioAntigo.dataNascimento = cliente.dataNascimento;
      usuarioAntigo.email = cliente.email;
      usuarioAntigo.nome = cliente.nome;
      clientes = clientes.filter(x => x.id != usuarioAntigo!.id);
    }
    clientes.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
  }
  deletarCliente(cliente: Cliente): Cliente[] {
    var clientes = this.getClientes();
    var usuarioAntigo = this.getCliente(cliente.id!);
    if (usuarioAntigo) {
      clientes = clientes.filter(x => x.id != cliente.id);
    }
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }
}
