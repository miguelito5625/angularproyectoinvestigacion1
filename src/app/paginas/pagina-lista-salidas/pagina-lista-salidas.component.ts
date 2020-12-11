import { Component, OnInit } from '@angular/core';
import { FirebaseArduinoRealTimeService } from 'src/app/servicios/firebaseArduinoRealTime/firebase-arduino-real-time.service';
import { map } from 'rxjs/operators';

declare var moment: any;


@Component({
  selector: 'app-pagina-lista-salidas',
  templateUrl: './pagina-lista-salidas.component.html',
  styleUrls: ['./pagina-lista-salidas.component.css']
})
export class PaginaListaSalidasComponent implements OnInit {


  listaSalidas: any = [];


  constructor(
    private servicioFART: FirebaseArduinoRealTimeService,
  ) { }

  ngOnInit(): void {
    this.obtenerTodasLasSalidas();
  }

  formatearFecha(fechaHora){
    return moment(fechaHora).locale('es').fromNow();
  }

  obtenerTodasLasSalidas() {
    this.servicioFART.obtenerTodasLasSalidas().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      // this.tutorials = data;
      console.log('Obteniendo todas las entradas');
      this.listaSalidas = data;
      console.log(data);
      
    });
  }

}
