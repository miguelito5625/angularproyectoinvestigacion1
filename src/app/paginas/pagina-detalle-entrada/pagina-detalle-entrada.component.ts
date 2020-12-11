import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseArduinoRealTimeService } from 'src/app/servicios/firebaseArduinoRealTime/firebase-arduino-real-time.service';

@Component({
  selector: 'app-pagina-detalle-entrada',
  templateUrl: './pagina-detalle-entrada.component.html',
  styleUrls: ['./pagina-detalle-entrada.component.css']
})
export class PaginaDetalleEntradaComponent implements OnInit {

  detalleEntrada:any;

  constructor(
    private servicioFART: FirebaseArduinoRealTimeService,
    private router: Router
  ) { 
    if (!this.servicioFART.detalleEntrada) {
      this.router.navigate(['/lista/entradas']);
    }
    this.detalleEntrada = this.servicioFART.detalleEntrada;
  }

  ngOnInit(): void {
  }

}
