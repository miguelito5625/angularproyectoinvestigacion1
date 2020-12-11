import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Arduinomega2560Service } from 'src/app/servicios/arduinomega2560/arduinomega2560.service';
import { FirebaseArduinoRealTimeService } from 'src/app/servicios/firebaseArduinoRealTime/firebase-arduino-real-time.service';
import { RevisionPersonasService } from 'src/app/servicios/revision-personas/revision-personas.service';
import { map } from 'rxjs/operators';


declare var $;
declare var Swal;

@Component({
  selector: 'app-pagina-medir-temperatura',
  templateUrl: './pagina-medir-temperatura.component.html',
  styleUrls: ['./pagina-medir-temperatura.component.css']
})
export class PaginaMedirTemperaturaComponent implements OnInit {

  cantidadPersonas: String = "0";
  personasEscaneadas: number = 0;
  listaPersonas: Array<any> = [];
  indicePersona: number = null;
  obteniendoTemperatura: boolean = false;

  constructor(
    private servicioRevisionPersonas: RevisionPersonasService,
    private servicioArduinoMega: Arduinomega2560Service,
    private router: Router,
    private servicioFART: FirebaseArduinoRealTimeService,
  ) {

    if (!this.servicioRevisionPersonas.cantidadPersonas || !this.servicioRevisionPersonas.accion) {
      this.router.navigate(['/']);
      return;
    }

    this.cantidadPersonas = this.servicioRevisionPersonas.cantidadPersonas.toString();

  }

  ngOnInit(): void {
    this.generarListaPersonas();
    this.obtenerTemperaturaArduino();
    // this.actualizarCantidadPersonas(5);

  }

  generarListaPersonas() {
    for (let index = 0; index < this.servicioRevisionPersonas.cantidadPersonas; index++) {
      this.listaPersonas.push({
        indice: index,
        persona: `Persona ${index + 1}`,
        temp: 0
      });
    }
  }

  obtenerTemperaturaArduino() {
    this.servicioFART.obtenerTemperaturaArduino().snapshotChanges().pipe(
      map((c =>
        ({ temperatura: c.payload.val(), ...c.payload.val() })
      ))
    ).subscribe(data => {
      console.log('Datos obtenidos:', data.temperatura);

      if (this.obteniendoTemperatura) {
        this.swalExitoObtenerTemperatura(data.temperatura);
        this.listaPersonas[this.indicePersona].temp = data.temperatura;
        this.calcularPersonasEscaneadas();
        this.obteniendoTemperatura = false;
        this.servicioFART.modificarDatosArduino('estado', 'espera');
        this.servicioFART.modificarDatosArduino('temperatura', 0);
      }
    });
  }

  getPersonTemp(indice: number) {

    this.servicioFART.modificarDatosArduino('temperatura', 0).then(
      () => {
        this.swalCargando();
        this.obteniendoTemperatura = true;
        this.indicePersona = indice;
        this.servicioFART.modificarDatosArduino('estado', 'pedTemp');
      }
    );



  }

  swalCargando() {
    Swal.fire({
      title: 'Obteniendo temperatura',
      icon: 'info',
      html: 'Por favor, espere',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    });
  }

  swalExitoObtenerTemperatura(personaTemp: string) {
    Swal.fire({
      title: `La temperatura es: ${personaTemp}°C`,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  swalErrorObtenerTemperatura() {
    Swal.fire({
      title: 'Error al obtener la temperatura!',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }

  async swalErrorPersonaTemperaturaAlta(mensaje: string) {

    const registroEntrada = {
      estado: 'Posible Covid-19',
      fechaHora: Date(),
      cantidadPersonas: this.listaPersonas.length,
      personas: this.listaPersonas
    };
    //this.actualizarCantidadPersonas(this.listaPersonas.length);
    this.servicioFART.crearRegistroEntrada(registroEntrada);


    const respuestaSwal = await Swal.fire({
      title: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });

    //Regresar a pagina principal
    this.router.navigate(['/']);

  }

  async swalNingunaConTempAlta(mensaje: string) {
    this.servicioFART.modificarDatosArduino('estado', 'eleEnt');
    const registroEntrada = {
      estado: 'Sin Posible Covid-19',
      fechaHora: Date(),
      cantidadPersonas: this.listaPersonas.length,
      personas: this.listaPersonas
    };
    this.actualizarCantidadPersonas(this.listaPersonas.length);
    this.servicioFART.crearRegistroEntrada(registroEntrada);
    const respuestaSwal = await Swal.fire({
      title: mensaje,
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
      const nuevaCantidadPersonas = Number(data.cantidadPersonas) + Number(cantidadPersonas);
      console.log(`nueva CantidadPersonas = ${nuevaCantidadPersonas}`);
      this.servicioFART.modificarDatosArduino('cantidadPersonas', nuevaCantidadPersonas);
      subscribeCantidadPersonas.unsubscribe();
    });
  }

  calcularPersonasEscaneadas() {
    this.personasEscaneadas = 0;
    this.listaPersonas.forEach(element => {
      if (element.temp > 0) {
        this.personasEscaneadas++;
      }
    });
    console.log(`Personas escaneadas: ${this.personasEscaneadas}`);

  }

  escaneoFinalizado() {
    if (Number(this.cantidadPersonas) === this.personasEscaneadas) {
      return true;
    } else {
      return false;
    }
  }

  finalizarObtencionTemperatura() {
    this.servicioRevisionPersonas.accion = null;
    let personasTempAlta = [];

    for (let index = 0; index < this.listaPersonas.length; index++) {
      const element = this.listaPersonas[index];
      if (element.temp > 37.5) {
        personasTempAlta.push(element);
      }
    }

    if (personasTempAlta.length > 0) {
      let mensajeTempAlta = "";
      if (personasTempAlta.length > 1) {
        mensajeTempAlta = `Alerta, ${personasTempAlta.length} personas con temperatura alta, nadie puede entrar`
      } else {
        mensajeTempAlta = `Alerta, ${personasTempAlta.length} persona con temperatura alta, nadie puede entrar`
      }
      this.swalErrorPersonaTemperaturaAlta(mensajeTempAlta);
      return;
    }


    this.swalNingunaConTempAlta('Levantando talanquera');



  }

}
