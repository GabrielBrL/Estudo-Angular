import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../../categorias/categoria';
import { CategoriaService } from '../../categorias/categoria.service';
import { LugarService } from '../lugar.service';

@Component({
  selector: 'app-lugar',
  standalone: false,
  templateUrl: './lugar.component.html',
  styleUrl: './lugar.component.scss'
})
export class LugarComponent implements OnInit {
  camposForm: FormGroup;
  categorias: Categoria[] = [];

  constructor(private _categoriaService: CategoriaService, private _lugareService: LugarService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),      
      categoria: new FormControl('', Validators.required),
      localizacao: new FormControl('', Validators.required),
      avaliacao: new FormControl(''),
      urlFoto: new FormControl(''),

    });

  }
  ngOnInit(): void {
    this._categoriaService.obterTodas().subscribe({
      next: lista => this.categorias = lista
    });
  }

  isCampoInvalido(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return (campo?.invalid && campo?.touched && campo?.errors?.['required']) || false;
  }

  salvar() {
    this.camposForm.markAllAsTouched();
    console.log(this.camposForm.value);
    if (this.camposForm.valid) {
      this._lugareService.salvar(this.camposForm.value).subscribe({
        next: _ => {
          alert('Salvo com sucesso');
          this.camposForm.reset();
        },
        error: err => alert(err)
      });
    }
  }
}
