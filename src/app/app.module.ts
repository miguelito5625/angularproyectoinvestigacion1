import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacionComponent } from './componentes/navegacion/navegacion.component';
import { PaginaCantidadPersonasComponent } from './paginas/pagina-cantidad-personas/pagina-cantidad-personas.component';
import { PaginaElegirEntradaosalidaComponent } from './paginas/pagina-elegir-entradaosalida/pagina-elegir-entradaosalida.component';
import { PaginaListaElegirEntsalComponent } from './paginas/pagina-lista-elegir-entsal/pagina-lista-elegir-entsal.component';
import { PaginaListaEntradasComponent } from './paginas/pagina-lista-entradas/pagina-lista-entradas.component';
import { PaginaListaSalidasComponent } from './paginas/pagina-lista-salidas/pagina-lista-salidas.component';
import { PaginaMedirTemperaturaComponent } from './paginas/pagina-medir-temperatura/pagina-medir-temperatura.component';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { PaginaDetalleEntradaComponent } from './paginas/pagina-detalle-entrada/pagina-detalle-entrada.component';
import { PaginaDetalleSalidaComponent } from './paginas/pagina-detalle-salida/pagina-detalle-salida.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    PaginaCantidadPersonasComponent,
    PaginaElegirEntradaosalidaComponent,
    PaginaListaElegirEntsalComponent,
    PaginaListaEntradasComponent,
    PaginaListaSalidasComponent,
    PaginaMedirTemperaturaComponent,
    PaginaDetalleEntradaComponent,
    PaginaDetalleSalidaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
