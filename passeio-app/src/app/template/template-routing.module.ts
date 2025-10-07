import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'categorias',
        loadChildren: () => import('../categorias/categorias.module')
          .then(m => m.CategoriasModule),
        pathMatch: 'full',
        data: {
          titulo: "Categorias",
          subtitulo: "Cadastro de categorias"
        }
      },
      {
        path: 'lugares',
        loadChildren: () => import('../lugares/lugares.module')
          .then(m => m.LugaresModule),
        pathMatch: 'full',
        data: {
          titulo: "Lugares",
          subtitulo: "Cadastro de lugares"
        }
      },
      {
        path: 'galeria',
        loadChildren: () => import('../galeria/galeria.module')
          .then(m => m.GaleriaModule),
        pathMatch: 'full',
        data: {
          titulo: "Galeria",
          subtitulo: "Visualização de todos os lugares"
        }
      }
    ],
    data: {
      titulo: "Categorias",
      subtitulo: "Cadastro de categorias"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateRoutingModule { }
