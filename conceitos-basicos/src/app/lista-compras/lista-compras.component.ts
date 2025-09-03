import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemLista } from './itemlista';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-compras',
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-compras.component.html',
  styleUrl: './lista-compras.component.css'
})
export class ListaComprasComponent {
  productName: string = "";
  listProducts: Array<ItemLista> = [];

  addProduct() {
    let itemLista = new ItemLista();
    itemLista.productName = this.productName;
    itemLista.id = this.listProducts.length + 1;
    if (this.productName)
      this.listProducts.push(itemLista);
    this.productName = "";
  }

  resetProducts() {
    this.listProducts = [];
  }

  selectItem(item: ItemLista) {
    item.selected = !item.selected;
  }
}
