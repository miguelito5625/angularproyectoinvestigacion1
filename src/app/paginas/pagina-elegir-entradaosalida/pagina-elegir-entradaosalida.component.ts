import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RevisionPersonasService } from 'src/app/servicios/revision-personas/revision-personas.service';

@Component({
  selector: 'app-pagina-elegir-entradaosalida',
  templateUrl: './pagina-elegir-entradaosalida.component.html',
  styleUrls: ['./pagina-elegir-entradaosalida.component.css']
})
export class PaginaElegirEntradaosalidaComponent implements OnInit {

  constructor(
    private servicioRevisionPersonas: RevisionPersonasService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registrarEntrada(){
    this.servicioRevisionPersonas.accion = "entrar";
    this.router.navigate(['/cantidad-personas']);
  }

  registrarSalida(){
    this.servicioRevisionPersonas.accion = "salir";
    this.router.navigate(['/cantidad-personas']);
  }

}
