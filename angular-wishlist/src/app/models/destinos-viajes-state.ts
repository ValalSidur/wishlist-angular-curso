import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinoViaje } from './destino-viaje';
import { HttpClientModule } from '@angular/common/http';

//Estado
export interface DestinosViajesState {
	items: DestinoViaje[];
	loading: boolean;
	favorito: DestinoViaje;
}

export function initialzeDestinosViajesState() {
	return {
		items: [],
		loading: false,
		favorito: null
	};
};

//Acciones
export enum DestinosViajesActionTypes {
	Nuevo_Destino = '[Destino Viajes] Nuevo',
	Elegido_Favorito = '[Destino Viajes] favorito',
	VOTE_UP = '[Destino Viajes] Vote Up',
	VOTE_DOWN = '[Destino Viajes] Vote Down',
	INIT_MY_DATA = '[Destinos Viajes] Init My Data'
}

export class NuevoDestinoAction implements Action{
	type = DestinosViajesActionTypes.Nuevo_Destino;
	constructor(public destino: DestinoViaje){}
}

export class ElegidoFavoritoAction implements Action { 
	type = DestinosViajesActionTypes.Elegido_Favorito;
	constructor(public destino: DestinoViaje){}
}

export class VoteUpAction implements Action { 
	type = DestinosViajesActionTypes.VOTE_UP;
	constructor(public destino: DestinoViaje){}
}

export class VoteDownAction implements Action { 
	type = DestinosViajesActionTypes.VOTE_DOWN;
	constructor(public destino: DestinoViaje){}
}

export class InitMyDataAction implements Action {
	type = DestinosViajesActionTypes.INIT_MY_DATA;
	constructor(public destinos: string[]){}
}

export type DestinosViajesActions = NuevoDestinoAction | ElegidoFavoritoAction | VoteUpAction | VoteDownAction | InitMyDataAction;

//Reducers
export function reducerDestinosViajes(
	state: DestinosViajesState, 
	action: DestinosViajesActions
): DestinosViajesState {
	switch(action.type){
		case DestinosViajesActionTypes.INIT_MY_DATA: {
			const destinos: string[] = (action as unknown as InitMyDataAction).destinos;
			return {
				...state, items: destinos.map((d) => new DestinoViaje(d, ''))
			};
		}
		case DestinosViajesActionTypes.Nuevo_Destino: {
			return {
				...state,
				items: [...state.items, (action as NuevoDestinoAction).destino]
			}
		};
		case DestinosViajesActionTypes.Elegido_Favorito: {
			state.items.forEach(x => x.setSelected(false));
			const fav: DestinoViaje = (action as ElegidoFavoritoAction).destino;
			fav.setSelected(true);
			return{
				...state, favorito: fav
			};
		}
		case DestinosViajesActionTypes.VOTE_UP: {
			const d: DestinoViaje = (action as VoteUpAction).destino;
			d.voteUp();
			return{	...state };
		}
		case DestinosViajesActionTypes.VOTE_DOWN: {
			const d: DestinoViaje = (action as VoteDownAction).destino;
			d.voteDown();
			return{	...state };
		}
	}
	return state;
}

//Effects
@Injectable()
export class DestinosViajesEffects {
	@Effect()
	nuevoAgregado$: Observable<Action> = this.actions$.pipe(
		ofType(DestinosViajesActionTypes.Nuevo_Destino),
	map((action: NuevoDestinoAction) => new ElegidoFavoritoAction(action.destino))
	);

	constructor(private actions$: Actions){

	}
}
