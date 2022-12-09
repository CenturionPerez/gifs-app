import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'//Esto evita que tengamos que declararlo en los providers del modulo
  //Lo eleva el servicio a un nivel global.Esto llego desde angular 4
})
export class GifsService {

  private servicioUrl: string = 'https://api.giphy.com/v1/gifs'
  private apiKey: string = 'fOnfzrM0HRRn2YhBgygxPNzju2Js9T2n';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial(){ //Para romper el error y desreferenciar acordarse de poner [...propiedadClase]
    return [...this._historial];
  }
  buscarGifs(query: string){
    if(query == ''){return;}

    let queryUno = query.replace(/\s+/g, '').toLocaleLowerCase();
 

    if(this._historial.includes(queryUno)){
      this._historial = this._historial.filter(e => e !== queryUno); 
    }
      //Realizamos llamada a la API GIPHY DEVELOPERS

      /*Ejemplo de llamada 1
        fetch("https://api.giphy.com/v1/gifs/search?api_key=fOnfzrM0HRRn2YhBgygxPNzju2Js9T2n&q=dbz&limit=10")
        .then( resp =>{
          resp.json().then(data =>{
            console.log(data)
          })
        })*/

      /*IMPORTANTE -> Realizamos llamada HTTP con los observable y las clase HTTP
        Tiene metodos como get, post...
          Podemos llamar con una cadena string "request" pero es mejor usar `request` porque
            podemos meter parametros a la cadena ${}. Conseguimos con esto dinamismo
            Una vez llamemos, tenemos que utilizar suscribe que funcionaria como then.
              .subscribe( resp =>{console.log(resp)})

        Si no queremos usar any como tipo que devuelve la llamada, tenemos que construir una
        interfaz diciendo al get<interfaz> y dentro del .subscribe( (resp:interfaz) =>{
        para que se convierta a ese tipo y podamos tener un tipado del contenido y mejorar
        la manipulacion de la respuesta

        Si necesitamos crear la interfaz podemos hacer uso de:
        https://app.quicktype.io/ donde tenemos que pegar el json que recibimos por postman u otro software
      */
        this.callService(queryUno);
  }
  callService(query: string){
    //Para no tener que pasar valores directamente dentro de la request y tener que poner incluso
    //dentro de la request los campos con sus respectivos valores, se puede usar HttpParams()
    //Para poder crear unas propiedades/campos a la request automaticamente que se insertaran en ella
    //Vease el siguiente ejemplo
    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','10')
      .set('q',query)

    //Enviamos los parametros con params dentro del get
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe( (resp:SearchGifsResponse) =>{
      if(resp.data.length == 0){return;}
      else{
        this._historial.unshift(query);
        this._historial = this._historial.splice(0,10);

        //Para alamcenar en almacenamiento en memoria es tan sencillo como utilizar
        //localStorage y asi conseguir que ciertos datos se quedan en sesion y no se pierdan
        //a no ser que el cliente borre la cache y demas
        //Podemos almacenar un valor concreto o meter un arreglo, usando el objeto
        //JSON.stringify que lo traduce a cadena
        localStorage.setItem("historial", JSON.stringify(this._historial));

        this.resultados = resp.data;
        //Almacenamos en local storage
        localStorage.setItem("resultados",JSON.stringify( resp.data));
      }
    })
  }
   //IMPORTANTE ->Para poder realizar la llamada debemos hacer lo siguiente en el cosntructor
    //Importamos la clase HttpClient de '@angular/common/http';
    //Esto nos permitira realizar ya peticiones HTTP(get, post...) usando observable
      //Por lo general mas control que la promesa
    constructor( private http: HttpClient ){
        //Con JSON.parse toma un objeto serializado y lo retorna a lo que era
        //Solo puede ser un objeto literal o string primitvo
        //Como puede devolver un nulo y fallar, indicamos que confie con exclamacion
        this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
        this.resultados = JSON.parse(localStorage.getItem("resultados")!) || [];//Decimos con explamacion que confie
    }
   
  
}
