import { Component, OnInit } from '@angular/core';
import { DestinoViaje } from './../models/destino-viaje';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  nuevosDestinos: DestinoViaje[];
  constructor() { 
    this.nuevosDestinos = [];
  }

  ngOnInit(): void {}

  guardar(nombre:string, url:string):boolean{
    this.nuevosDestinos.push(new DestinoViaje(nombre, url));
    return false 
  }
}
