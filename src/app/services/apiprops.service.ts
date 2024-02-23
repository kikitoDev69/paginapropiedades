import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { features } from '../models/features';
import { newPropiedadesDB } from '../models/newPropiedadesDB';
import { propiedadesDB } from '../models/propiedadesDB';
import { props } from '../models/props';
import { Respuesta } from '../models/respuesta';
import {  apisrc  as apiscr} from '../security/apissource';


@Injectable({
  providedIn: 'root'
})



export class ApipropsService {

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  url: string = '/api/Prop'

  private featureSubject: BehaviorSubject<props>  ;

  public features: Observable<props>;


  public get featureData(): props{
    return this.featureSubject.value;
  }


  constructor(private _http: HttpClient) {
    this.featureSubject = new BehaviorSubject<props>(null!);
    this.features = this.featureSubject.asObservable();


   }



   getUsuar$(): Observable<props> {
    return this.features;
  }

  
   getProps(): Observable<Respuesta>{ 

    return this._http.get<Respuesta>(apiscr +this.url, this.httpOption) 
    .pipe(
      map(res => {
        if(res.data.features){
          const features: props = res.data;
          this.featureSubject.next(features);
        }
        return res;
      })
    )
    

   }





urlprop = "/api/Prop/Id/"
    
   getProp(Id: number): Observable<Respuesta>{ 

    return this._http.get<Respuesta>(apiscr+ this.urlprop + Id, this.httpOption);
    

   }


   //endpoint para imágenes

   
  url2: string = '/api/Imagenes/id/'


  getImage(id: string): Observable<props>{ 

    return this._http.get<props>(apiscr +this.url2 + id, this.httpOption)
    
   }

// end point add 
   urladd :string = "/api/Prop/add/"

   addProp(nuevaPropiedad : propiedadesDB): Observable<Respuesta>{ 

    return this._http.post<Respuesta>(apiscr +this.urladd, nuevaPropiedad,  this.httpOption)
    
   }

   deleteProp(nuevaPropiedad : any): Observable<Respuesta>{
    
    return this._http.post<Respuesta>(apiscr +this.url, nuevaPropiedad,  this.httpOption)
   }
   

   editProp(nuevaPropiedad : newPropiedadesDB): Observable<Respuesta>{
    
    return this._http.put<Respuesta>(apiscr +this.url, nuevaPropiedad,  this.httpOption)
   }


    url3 : string = "/api/Prop/propiedadesCard";
   getProps3(): Observable<Respuesta>{ 

    return this._http.get<Respuesta>(apiscr +this.url3, this.httpOption) 
    
    

   }
}



