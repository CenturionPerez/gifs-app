import { Component} from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

export class FeatureModule {}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {
  //Inyectamos las caracteristicas servicio directamente
  constructor(private gifsService: GifsService){ }

  get historial(): string[] {//Si creamos un getter se crea la propiedad
    return this.gifsService.historial;
  }
  
  rechargeGifs(result: string){
    this.gifsService.buscarGifs(result);
  }
  deleteHistory(){
    this.gifsService.cleanHistorial();
  }
}
