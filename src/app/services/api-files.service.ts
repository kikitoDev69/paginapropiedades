import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fileof } from '../models/fileof';
import { Respuesta } from '../models/respuesta';
import { usuario } from '../models/usuario';
import {  apisrc  as apiscr} from '../security/apissource';

@Injectable({
  providedIn: 'root'
})
export class ApiFIlesService {



  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  


  httpOption2 = {
    headers: new HttpHeaders({
     
      'content-Type': 'multipart/form-data' 
    })
  }
  url: string = '/api/File'


  constructor(private _http: HttpClient) {



   }

  


   //endpoint para imágenes

   

   url2: string = '/api/File/get/'


   urlportadas: string = "/api/File/portadas"

  getportadas(): Observable<Respuesta>{ 

    return this._http.get<Respuesta>(apiscr + this.urlportadas, this.httpOption)
    
   }

   urlportada: string = "/api/File/portada/"

  getportada(id : number): Observable<Respuesta>{ 

    return this._http.get<Respuesta>(apiscr + this.urlportada + id, this.httpOption)
    
   }


   getFiles(id: string): Observable<Respuesta>{ 

    return this._http.get<Respuesta>(apiscr + this.url2 + id, this.httpOption)
    
   }

   urlfileof: string = '/api/File/fileof'

   getFilesof(request : fileof): Observable<Respuesta>{ 

    return this._http.post<Respuesta>(apiscr +this.urlfileof ,request, this.httpOption)
    
   }


   urlupdatePRivacy: string = '/api/File/privacy'

   updatePrivacy(request : any): Observable<Respuesta>{ 

    return this._http.put<Respuesta>(apiscr +this.urlupdatePRivacy ,request, this.httpOption)
    
   }


  uploadFile(formData: FormData ): Observable<Respuesta>{ 

    return this._http.post<Respuesta>(apiscr +this.url, formData)
    
   }

   urldelete : string = "/api/File/delete/"

   deleteFile(id: number ): Observable<Respuesta>{ 

    return this._http.get<Respuesta>(apiscr +this.urldelete + id, this.httpOption)
    
   }


}
