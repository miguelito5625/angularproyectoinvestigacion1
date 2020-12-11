import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RevisionPersonasService {
  
  cantidadPersonas:number = 2;
  accion:String = null;
  
  constructor() { }
}
