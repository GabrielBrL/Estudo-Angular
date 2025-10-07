import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria',
  standalone: false,
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss'
})
export class CategoriaComponent {
  camposForm: FormGroup;

  /**
   *
   */
  constructor(private _categoriaService: CategoriaService) {
    this.camposForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required)
    });
  }

  salvar() {
    this.camposForm.markAllAsTouched();
    if (this.camposForm.valid) {
      this._categoriaService.salvar(this.camposForm.value)
        .subscribe({
          next: _ => {
            alert('Salvo com sucesso');
            this.camposForm.reset();
          },
          error: error => alert(error)
        });
    }
  }

  isCampoInvalido(nomeCampo: string): boolean {
    const campo = this.camposForm.get(nomeCampo);
    return (campo?.invalid && campo?.touched && campo?.errors?.['required']) || false;
  }
}
