import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from './../../models/destino-viaje';
import { DestinosApiClient } from './../../models/destinos-api-client';
import { Store } from '@ngrx/store';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './../../models/destinos-viajes-state';
import { appState } from './../../app.module';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})

export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  updates: string[];
  all: DestinoViaje[];
  constructor(public destinosApiClient:DestinosApiClient, public store: Store<appState>) { 
    this.onItemAdded = new EventEmitter();
    this.updates = [];

    //Redux
    this.store.select(state => state.destinos.favorito)
    .subscribe(d => {
      if(d != null){
        this.updates.push('Se ha elegido a '+d.nombre);
      }
    });
    store.select(state => state.destinos.items).subscribe(items => this.all = items);
    //Fin Redux

    /*
    this.destinosApiClient.subscribeOnChange((d: DestinoViaje) => {
      if(d != null){
        this.updates.push('Se ha elegido a '+d.nombre);
      }
    });
    */
  }

  ngOnInit(): void {}

  agregado(d: DestinoViaje) {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    //Disparar redux
    this.store.dispatch(new NuevoDestinoAction(d));
    //return false 
  }

  elegido(e:DestinoViaje){
    this.destinosApiClient.elegir(e);
  }

  getAll(){
      console.log(this.all);
  }
}
