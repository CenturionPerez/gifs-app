import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

//DECORADOR @ViewChild('nombreId o clase o componente hrml')
  //permite obtener la infomacion de ese elemento HTML
    //Si queremos decir a Angular que existe nuestro elemento y no nos de error porque puede que no exista
    //debemos poner el signo de exclamacion hacia abajo detras del nombre de la variable.
      //txtBuscar!: ->Esto asegura que el objeto no va a ser nulo nunca porque siempre existira
        //https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
  
        @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>; 
        buscar(){
          const valor = this.txtBuscar.nativeElement.value;
          if(valor.trim().length === 0){ return; }

          this.gifsService.buscarGifs(valor);
          this.txtBuscar.nativeElement.value = '';
        }

        constructor(private gifsService: GifsService){}
}
