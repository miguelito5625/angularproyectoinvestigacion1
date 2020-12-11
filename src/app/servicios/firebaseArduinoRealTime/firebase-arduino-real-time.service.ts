import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class FirebaseArduinoRealTimeService {

  detalleEntrada:any;

  // registrosEntradas: any = [];
  // registrosSalidas: any = [];

  private dbPath = '/';
  private rutaDatosArduino = '/proyecto/arduino';
  private rutaTemperaturaArduino = '/proyecto/arduino/temperatura';
  private rutaRegistrosEntradas = '/proyecto/registros/entradas';
  private rutaRegistrosSalidas = '/proyecto/registros/salidas';
  

  listaRegistrosEntradas: AngularFireList<any> = null;
  listaRegistrosSalidas: AngularFireList<any> = null;
  datosArduino: AngularFireObject<any> = null;
  temperaturaArduino: AngularFireObject<any> = null;

  constructor(private db: AngularFireDatabase) {
    this.listaRegistrosEntradas = db.list(this.rutaRegistrosEntradas);
    this.listaRegistrosSalidas = db.list(this.rutaRegistrosSalidas);
    this.temperaturaArduino = db.object<any>(this.rutaTemperaturaArduino);
    this.datosArduino = db.object<any>(this.rutaDatosArduino);
  }


  modificarDatosArduino(atributo: string, valor: any): Promise<void> {
    return this.datosArduino.update(
      {
        [atributo]: valor
      }
      );
  }

  obtenerTemperaturaArduino(): AngularFireObject<any> {
    return this.temperaturaArduino;
  }

  obtenerDatosArduino(): AngularFireObject<any> {
    return this.datosArduino;
  }


  // ----------------------------------------------------------------------------------------------------------------------------------- //

  obtenerTodasLasSalidas(): AngularFireList<any> {
    return this.listaRegistrosSalidas;
  }

  crearRegistroSalida(any: any): any {
    return this.listaRegistrosSalidas.push(any);
  }

  modificarRegistroSalida(key: string, value: any): Promise<void> {
    return this.listaRegistrosSalidas.update(key, value);
  }

  borrarRegistroSalida(key: string): Promise<void> {
    return this.listaRegistrosSalidas.remove(key);
  }

  borrarTodosRegistroSalida(): Promise<void> {
    return this.listaRegistrosSalidas.remove();
  }


    // ----------------------------------------------------------------------------------------------------------------------------------- //




  obtenerTodasLasEntradas(): AngularFireList<any> {
    return this.listaRegistrosEntradas;
  }

  crearRegistroEntrada(any: any): any {
    return this.listaRegistrosEntradas.push(any);
  }

  modificarRegistroEntrada(key: string, value: any): Promise<void> {
    return this.listaRegistrosEntradas.update(key, value);
  }

  borrarRegistroEntrada(key: string): Promise<void> {
    return this.listaRegistrosEntradas.remove(key);
  }

  borrarTodosRegistroEntrada(): Promise<void> {
    return this.listaRegistrosEntradas.remove();
  }



  // --------------------------------------------------------------------------------------------------------------------------------------  //

  obtenerObjeto(){
    return this.db.object<any>(this.rutaDatosArduino);
  }

  


}
