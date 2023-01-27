import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { props } from '../models/props';



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


  constructor(private _http: HttpClient) {



   }

   getProps(): Observable<props>{ 

    return this._http.get<props>(this.url, this.httpOption)
    
   }
}
