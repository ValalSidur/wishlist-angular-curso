import { Component, OnInit, Output, EventEmitter, forwardRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DestinoViaje } from './../../models/destino-viaje';
import { AbstractControl, ValidatorFn} from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { appConfig, APP_CONFIG } from 'src/app/app.module';
import { DestinosApiClient } from 'src/app/models/destinos-api-client';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html', 
  styleUrls: ['./form-destino-viaje.component.css']
})

export class FormDestinoViajeComponent implements OnInit {
  //Declaración de variables
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
  minLongitud: number;
  searchResults: string[];

  constructor(private apicliente: DestinosApiClient, fb: FormBuilder, @Inject(forwardRef(() => APP_CONFIG)) private config: appConfig) { 
    //inicializar
    this.onItemAdded = new EventEmitter();
    //vinculacion con tag html
    this.minLongitud = 3;
    this.fg = fb.group({
      nombre: ['', Validators.compose([
          Validators.required,
          this.nombreValidator,
          this.nombreValidatorParametrizable(this.minLongitud)
        ])],
      url: ['']
    });
    
    this.searchResults = [];

    //observador de tipeo
    this.fg.valueChanges.subscribe((form: any) =>{
      console.log('cambio el formulario: ', form);
    })
  }

  ngOnInit(): void {
    const elemNombre = <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
      .pipe(
        //map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        //map((e: KeyboardEvent) => (HTMLInputElement)e.target.value),
        map((e: KeyboardEvent) => (<HTMLInputElement>e.target).value),
        filter(text => text.length > 2),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((text: string) => ajax(this.config.apiEndpoint+'/ciudades?q='+text))
        ).subscribe(ajaxresponse => { this.searchResults = ajaxresponse.response as string[] });
        console.log(this.config.apiEndpoint+'/ciudades?q=');
        // Este es consulta de un json desde lectura de archivo.
        //switchMap(() => ajax("/assets/datos.json")))
        //.subscribe( ajaxResponse => { 
        //   this.searchResults = ajaxResponse.response as string[];
        //});
        
  }

  guardar(nombre: string, url: string): boolean {
    const d = new DestinoViaje(nombre, url);
    this.onItemAdded.emit(d);
    return false;
  }

  //Funcion de validación de longitud
  nombreValidator(control: FormControl): { [s: string]: boolean } {
    const l = control.value.toString().trim().length;
    if(l > 0 && l < 5) { 
       return { invalidNombre: true };
    }
    return null as any;
  }

  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: AbstractControl): { [s: string]: boolean } | null => {
      const l = control.value.toString().trim().length;
      if(l > 0 && l < minLong){
        return { minLongNombre: true };
      }
      return null as any;
    }; 
  }
}