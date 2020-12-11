import { Component, OnInit } from '@angular/core';
import { Arduinomega2560Service } from './servicios/arduinomega2560/arduinomega2560.service';
import { ClienteService } from './servicios/cliente/cliente.service';
import { FirebaseArduinoRealTimeService } from './servicios/firebaseArduinoRealTime/firebase-arduino-real-time.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'arduinoangularcursoinvestigacion';


  constructor(
    // private servicioClientes: ClienteService,
    private servicioArduinoMega: Arduinomega2560Service,
    private servicioFART: FirebaseArduinoRealTimeService
  ) {
    // this.servicioClientes.ObtenerClientes().subscribe((clientes)=> {
    //   console.log(clientes);

    // });    
  }


  ngOnInit() {
    // this.obtenerTodasLasEntradas();
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
      // this.servicioFART.registrosEntradas = data;
      // console.log(this.servicioFART.registrosEntradas);
      // console.log('cantidad: ', this.servicioFART.registrosEntradas.length);
      
    });
  }















  encenderLed(){
    const subcribe = this.servicioArduinoMega.encenderLed().subscribe((res)=>{
      console.log(res);
      subcribe.unsubscribe();
    });
  }

  apagarLed(){
    const subcribe = this.servicioArduinoMega.apagarLed().subscribe((res)=>{
      console.log(res);
      subcribe.unsubscribe();
    });
  }

  getPersonTemp(){
    const subcribe = this.servicioArduinoMega.getPersonTemp().subscribe((res)=>{
      console.log(res);
      subcribe.unsubscribe();
    });
  }


}
