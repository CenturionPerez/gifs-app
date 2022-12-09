import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GifsModule } from './gifs/gifs.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,//Si queremos importar el modulo para realizar llamadas http.
    //Nos aporta un monton de metodos que facilitan las llamadas y manipulacion de ellas
    SharedModule,
    GifsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
