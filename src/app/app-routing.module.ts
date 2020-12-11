import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaCantidadPersonasComponent } from './paginas/pagina-cantidad-personas/pagina-cantidad-personas.component';
import { PaginaDetalleEntradaComponent } from './paginas/pagina-detalle-entrada/pagina-detalle-entrada.component';
import { PaginaElegirEntradaosalidaComponent } from './paginas/pagina-elegir-entradaosalida/pagina-elegir-entradaosalida.component';
import { PaginaListaElegirEntsalComponent } from './paginas/pagina-lista-elegir-entsal/pagina-lista-elegir-entsal.component';
import { PaginaListaEntradasComponent } from './paginas/pagina-lista-entradas/pagina-lista-entradas.component';
import { PaginaListaSalidasComponent } from './paginas/pagina-lista-salidas/pagina-lista-salidas.component';
import { PaginaMedirTemperaturaComponent } from './paginas/pagina-medir-temperatura/pagina-medir-temperatura.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaElegirEntradaosalidaComponent
  },
  {
    path: 'cantidad-personas',
    component: PaginaCantidadPersonasComponent
  },
  {
    path: 'medir-temperatura',
    component: PaginaMedirTemperaturaComponent
  },
  {
    path:'lista',
    component: PaginaListaElegirEntsalComponent
  },
  {
    path:'lista/entradas',
    component: PaginaListaEntradasComponent
  },
  {
    path:'lista/salidas',
    component: PaginaListaSalidasComponent
  },
  {
    path:'lista/entradas/detalle',
    component: PaginaDetalleEntradaComponent
  },
  {
    path:'lista/salidas/detalle',
    component: PaginaListaSalidasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
