import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseArduinoRealTimeService } from 'src/app/servicios/firebaseArduinoRealTime/firebase-arduino-real-time.service';
import { RevisionPersonasService } from 'src/app/servicios/revision-personas/revision-personas.service';
import { map } from 'rxjs/operators';


declare var Swal;

@Component({
  selector: 'app-pagina-cantidad-personas',
  templateUrl: './pagina-cantidad-personas.component.html',
  styleUrls: ['./pagina-cantidad-personas.component.css']
})
export class PaginaCantidadPersonasComponent implements OnInit {

  @ViewChild('btn') btn: ElementRef;

  cantidadPersonas: String = "0";

  constructor(
    private servicioRevisionPersonas: RevisionPersonasService,
    private servicioFART: FirebaseArduinoRealTimeService,
    private router: Router
  ) {
    if (!this.servicioRevisionPersonas.accion) {
     this.router.navigate(['/']) ;
     return;
    }
    console.log('la accion es:', this.servicioRevisionPersonas.accion);
    
   }

  ngOnInit(): void {
    // this.crearRegistroEntrada();
    // this.borrarTodosRegistroEntrada();
    // this.obtenerTodasLasEntradas();
    // this.actualizarRegistroPrueba();
    // this.listarDatosArduinoPrueba();
    // this.obtenerObjeto();
  }


  crearRegistroEntrada() {
    this.servicioFART.crearRegistroEntrada(
      {
        cantidad: 2,
        fechaHora: Date()
      }
    ).then(() => {
      console.log('Created new item successfully!');
    });
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
      console.log('Datos obtenidos');
      console.log(data);


    });
  }

  listarDatosArduinoPrueba() {
    this.servicioFART.obtenerDatosArduino().snapshotChanges().pipe(
      map((c =>
        ({ key: c.payload.key, ...c.payload.val() })
      ))
    ).subscribe(data => {
      // this.tutorials = data;
      console.log('Datos obtenidos');

      // const datos = data[0];
      console.log(data);


    });
  }

  obtenerObjeto() {
    this.servicioFART.obtenerObjeto().snapshotChanges().pipe(
      map((c =>
        ({ key: c.payload.key, ...c.payload.val() })
      ))
    ).subscribe(data => {
      console.log('Objeto obtenido');
      console.log(data);
    });
  }

  modificarRegistroEntrada() {
    const key = 'proyecto';
    const data = {
      registros: {
        entradas: [
          {
            cantidad: 4,
            fechaHora: Date()
          }
        ],
        salidas: [
          {
            cantidad: 4,
            fechaHora: Date()
          }
        ]
      }
    };

    this.servicioFART.modificarRegistroEntrada(key, data)
      .then(() => {
        console.log('Datos actualizados correctamente');

      })
      .catch(err => console.log(err));
  }

  borrarTodosRegistroEntrada() {
    
    this.servicioFART.borrarTodosRegistroEntrada()
      .then(() => {
        console.log('Datos eliminados correctamente');

      })
      .catch(err => console.log(err));
  }

  setCantidadPersonas(event) {
    let numero = (event.target as HTMLInputElement).textContent;
    console.log(numero);
    if (this.cantidadPersonas === "0") {
      this.cantidadPersonas = "";
    }
    this.cantidadPersonas = this.cantidadPersonas.concat(numero);
    this.servicioRevisionPersonas.cantidadPersonas = Number(this.cantidadPersonas);
  }

  limpiarContador() {
    this.cantidadPersonas = "0";
  }

  async siguientePagina() {

    if (Number(this.cantidadPersonas) < 1) {
      Swal.fire({
        title: 'Debe ingresar al menos 1 persona',
        icon: 'info',
        // showCancelButton: true,
        confirmButtonText: 'Entendido!',
      });
      return;
    }

    const pregunta = await Swal.fire({
      title: '¿Continuar?',
      text: `Son ${this.cantidadPersonas} personas`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    });

    if (pregunta.dismiss) {
      return;
    }
    // console.log(pregunta);

    if (this.servicioRevisionPersonas.accion === "entrar") {
      this.router.navigate(['/medir-temperatura']);
    } else {
      this.realizarSalidaPersonas();
    }

  }

  
  async realizarSalidaPersonas(){
    this.servicioFART.modificarDatosArduino('estado', 'eleSal');
    const registroEntrada = {
      fechaHora: Date(),
      cantidadPersonas: this.cantidadPersonas
    };

    this.actualizarCantidadPersonas(this.cantidadPersonas);
    this.servicioFART.crearRegistroSalida(registroEntrada);
    const respuestaSwal = await Swal.fire({
      title: `Saliendo ${this.cantidadPersonas} persona(s)`,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
    //regresar pagina principal
    this.router.navigate(['/']);
  }

  actualizarCantidadPersonas(cantidadPersonas) {
    const subscribeCantidadPersonas = this.servicioFART.obtenerDatosArduino().snapshotChanges().pipe(
      map((c =>
        ({ key: c.payload.key, ...c.payload.val() })
      ))
    ).subscribe(data => {
      console.log('Datos obtenidos');
      console.log(data);
      const nuevaCantidadPersonas = Number(data.cantidadPersonas) - Number(cantidadPersonas);
      console.log(`nueva CantidadPersonas = ${nuevaCantidadPersonas}`);
      this.servicioFART.modificarDatosArduino('cantidadPersonas', nuevaCantidadPersonas);
      subscribeCantidadPersonas.unsubscribe();
    });
  }


}
