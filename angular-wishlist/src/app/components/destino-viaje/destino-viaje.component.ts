import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { appState } from './../../app.module';
import { Store } from '@ngrx/store';
import { VoteDownAction, VoteUpAction } from './../../models/destinos-viajes-state';
import { DestinoViaje } from './../../models/destino-viaje';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino!: DestinoViaje;
  @Input('idx') posicion!: number; //no es buena practica renombrar a la variable
  @HostBinding('attr.class') cssClass = 'col-md-4';
  @Output() clicked: EventEmitter<DestinoViaje>;

  constructor(private store: Store<appState>) {
  	this.clicked = new EventEmitter();
  }

  ngOnInit(): void {
  }

  ir(){
  	this.clicked.emit(this.destino);
  	return false;
  }

  voteUp(){
    this.store.dispatch(new VoteUpAction(this.destino));
    return false;
  }

  voteDown(){
    this.store.dispatch(new VoteDownAction(this.destino));
    return false;
  }
}
