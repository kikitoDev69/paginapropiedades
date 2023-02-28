import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { features } from '../models/features';
import { newPropiedadesDB } from '../models/newPropiedadesDB';
import { propiedadesDB } from '../models/propiedadesDB';
import { props } from '../models/props';
import { Respuesta } from '../models/respuesta';



@Injectable({
  providedIn: 'root'
})



export class ApipropsService {

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  url: string = 'https://localhost:44335/api/Prop'

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

  
   getProps(): Observable<props>{ 

    return this._http.get<props>(this.url, this.httpOption) 
    .pipe(
      map(res => {
        if(res.features){
          const features: props = res;
          this.featureSubject.next(features);
        }
        return res;
      })
    )
    

   }





urlprop = "https://localhost:44335/api/Prop/Id/"
    
   getProp(Id: number): Observable<Respuesta>{ 

    return this._http.get<Respuesta>(this.urlprop + Id, this.httpOption);
    

   }


   //endpoint para imágenes

   
  url2: string = 'https://localhost:44335/api/Imagenes/id/'


  getImage(id: string): Observable<props>{ 

    return this._http.get<props>(this.url2 + id, this.httpOption)
    
   }

// end point add 
   urladd :string = "https://localhost:44335/api/Prop/add/"

   addProp(nuevaPropiedad : propiedadesDB): Observable<Respuesta>{ 

    return this._http.post<Respuesta>(this.urladd, nuevaPropiedad,  this.httpOption)
    
   }

   deleteProp(nuevaPropiedad : any): Observable<Respuesta>{
    
    return this._http.post<Respuesta>(this.url, nuevaPropiedad,  this.httpOption)
   }
   

   editProp(nuevaPropiedad : newPropiedadesDB): Observable<Respuesta>{
    
    return this._http.put<Respuesta>(this.url, nuevaPropiedad,  this.httpOption)
   }


    url3 : string = "https://localhost:44335/api/Prop/propiedadesCard";
   getProps3(): Observable<Respuesta>{ 

    return this._http.get<Respuesta>(this.url3, this.httpOption) 
    
    

   }
}



