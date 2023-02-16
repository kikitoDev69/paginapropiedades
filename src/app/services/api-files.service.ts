import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Respuesta } from '../models/respuesta';

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
  url: string = 'https://localhost:44335/api/File'


  constructor(private _http: HttpClient) {



   }

  


   //endpoint para imágenes

   

   url2: string = 'https://localhost:44335/api/File/get/'

  getFiles(id: string): Observable<Respuesta>{ 

    return this._http.get<Respuesta>(this.url2 + id, this.httpOption)
    
   }

  uploadFile(formData: FormData ): Observable<Respuesta>{ 

    return this._http.post<Respuesta>(this.url, formData)
    
   }

   urldelete : string = "https://localhost:44335/api/File/delete/"

   deleteFile(id: number ): Observable<Respuesta>{ 

    return this._http.get<Respuesta>(this.urldelete + id, this.httpOption)
    
   }


}
