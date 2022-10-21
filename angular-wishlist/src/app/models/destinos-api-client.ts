import { DestinoViaje } from './destino-viaje';
import { Store } from '@ngrx/store';
import { appConfig, appState, APP_CONFIG, db } from '../app.module';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-state';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { __values } from 'tslib';

@Injectable()
export class DestinosApiClient {
	destinosArray: DestinoViaje[];

	constructor(private store: Store<appState>, @Inject(forwardRef(() => APP_CONFIG)) private config: appConfig, private http: HttpClient){
		this.store.select(state => state.destinos)
		.subscribe((data) => {
			//console.log('destinos sub store');
			//console.log(data);
			this.destinosArray = data.items;
		});
		this.store.subscribe((data) => {
			//console.log('all store');
			//console.log(data);
		});
	}
		
	
	add(d:DestinoViaje){
		var extraccion = [];		
		const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
		const req = new HttpRequest('POST', this.config.apiEndpoint+'/my', { nuevo: d.nombre }, { headers: headers });
		this.http.request(req).subscribe((data: HttpResponse<{}>) => {
		if(data.status === 200){
			d.setSelected(true);
			//console.log(data);
			this.store.dispatch(new NuevoDestinoAction(d));
			const myDb = db;
			myDb.destinos.add(d);
			//console.log('todos los destinos de la bd!');
			myDb.destinos.toArray().then(destinos => console.log(destinos))
			myDb.destinos.toArray().then(destinos => {
				for(let i = 0; i < destinos.length; i++){
					extraccion.push(destinos[i]);
					console.log(extraccion);
				}
//				console.log(extraccion);
				this.destinosArray = extraccion;
				console.log(this.destinosArray);
			})
		}
		});
	}

	getById(id:string): DestinoViaje{
		return this.destinosArray.filter(function(d){ return d.id.toString() == id })[0];
	}

	getAll(): DestinoViaje[]{
		console.log("destinos de apiclientes");
		console.log(this.destinosArray);
		return this.destinosArray;
	}

    elegir(d: DestinoViaje){
		this.store.dispatch(new ElegidoFavoritoAction(d));
    }
}