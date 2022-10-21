import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinosApiClient } from './../../models/destinos-api-client';
import { DestinoViaje } from './../../models/destino-viaje';

@Component({
  selector: 'app-destino-detalle',
  templateUrl: './destino-detalle.component.html',
  styleUrls: ['./destino-detalle.component.css'],
  providers: [ 
    DestinosApiClient
   ]
})
export class DestinoDetalleComponent implements OnInit {
  destino: DestinoViaje;
  styles = {
    sources: {
        world: {
            type:'geojson',
            data: 'https://raw.githubusercontent.com/johan/worl.geo.json/master/countries.geo.json'
        }
    },
    version: 8,
    layers: [{
      'id': 'countries',
      'type': 'fill',
      'source': 'world',
      'layout': {},
      'paint': { 'fill-color': '#6F788A' }
    }]
  };
  mapa = JSON.stringify(this.styles);
  constructor(private route: ActivatedRoute, private destinoApiClient: DestinosApiClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.destino = this.destinoApiClient.getById(id);
  }

}
