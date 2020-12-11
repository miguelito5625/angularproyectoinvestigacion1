import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseArduinoRealTimeService } from 'src/app/servicios/firebaseArduinoRealTime/firebase-arduino-real-time.service';
import { map } from 'rxjs/operators';

declare var moment: any;

@Component({
  selector: 'app-pagina-lista-entradas',
  templateUrl: './pagina-lista-entradas.component.html',
  styleUrls: ['./pagina-lista-entradas.component.css']
})
export class PaginaListaEntradasComponent implements OnInit {

  listaEntradas: any = [];

  constructor(
    private servicioFART: FirebaseArduinoRealTimeService,
    private router: Router
  ) { 

  }

  ngOnInit(): void {
    this.obtenerTodasLasEntradas();
  }

  formatearFecha(fechaHora){
    return moment(fechaHora).locale('es').fromNow();
  }

  paginaDetalleEntrada(entrada){
    entrada.creadaHace = this.formatearFecha(entrada.fechaHora);
    console.log(entrada);
    
    this.servicioFART.detalleEntrada = entrada;
    this.router.navigate(['/lista/entradas/detalle']);
  }

  obtenerTodasLasEntradas() {
    this.servicioFART.obtenerTodasLasEntradas().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      // this.tutorials = data;
      console.log('Obteniendo todas las entradas');
      this.listaEntradas = data;
      
    });
  }


}
