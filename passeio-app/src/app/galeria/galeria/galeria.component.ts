import { Component, OnInit } from '@angular/core';
import { Lugar } from '../../lugares/lugar';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../../lugares/lugar.service';

@Component({
  selector: 'app-galeria',
  standalone: false,
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss'
})
export class GaleriaComponent implements OnInit {

  lugares: Lugar[] = [];
  categorias: Categoria[] = [];
  termoPesquisa: string = "";
  categoriaPesquisa: string = "";

  constructor(private _categoriaService: CategoriaService, private _lugarService: LugarService) {
  }

  ngOnInit(): void {
    this._categoriaService.obterTodas().subscribe({
      next: success => this.categorias = success,
      error: err => console.log(err)
    });
    this._lugarService.obterTodas().subscribe({
      next: success => this.lugares = success,
      error: err => console.log(err)
    })
  }

  filtro() {
    this._lugarService.filtrar(this.termoPesquisa, this.categoriaPesquisa)
      .subscribe({
        next: lugares => this.lugares = lugares
      });
  }

  getTotalEstrelas(lugar: Lugar): string {
    return "&#9733;".repeat(lugar.avaliacao || 0) + "&#9734;".repeat(5 - (lugar.avaliacao || 0));
  }
}
