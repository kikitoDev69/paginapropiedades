import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Login } from '../models/login';
import { newusuario } from '../models/newusuario';
import { Respuesta } from '../models/respuesta';
import { usuario } from '../models/usuario';
import {  apisrc  as apiscr} from '../security/apissource';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

 


  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  url: string = '/api/user/login'

 

  readonly width: string = '600px';
  private usuarioSubject: BehaviorSubject<usuario>  ;

  public usuar: Observable<usuario>;


  public get usuarioData(): usuario{
    return this.usuarioSubject.value;
  }

  
  
  constructor(private _http: HttpClient) {
    this.usuarioSubject = new BehaviorSubject<usuario>(JSON.parse(localStorage.getItem('usuario')! ))
    this.usuar = this.usuarioSubject.asObservable();
   }

   getUsuar$(): Observable<usuario> {
    return this.usuar;
  }

   

   login(login: Login): Observable<Respuesta>{
    return this._http.post<Respuesta>(apiscr+this.url, login, this.httpOption)
    .pipe(
      map(res => {
        if(res.exito===1){
          const user: usuario = res.data;
          localStorage.setItem('usuario', JSON.stringify(user))
          this.usuarioSubject.next(user);
        }
        return res;
      })
    )
}

urlAPIMONGO: string = 'http://localhost:8080/api/v1/coupon/SUPERSALE'

public getCOUPON(): Observable<Respuesta>{

  return this._http.get<Respuesta>(this.urlAPIMONGO)
  
}


logout(){
  localStorage.removeItem('usuario');
  this.usuarioSubject.next(null!)
}


urlgetrol : string = "/api/user/getRol"
public getrol( email: string): Observable<Respuesta>{
  return this._http.post<Respuesta>(apiscr+ this.urlgetrol, email, this.httpOption)
  
}

urladduser : string = "/api/user/addUser"
public adduser( newuser: newusuario): Observable<Respuesta>{
  return this._http.post<Respuesta>(apiscr + this.urladduser, newuser, this.httpOption)
  
}

urledituser : string = "/api/user"
public edituser( newuser: newusuario): Observable<Respuesta>{
  return this._http.put<Respuesta>(apiscr + this.urledituser, newuser, this.httpOption)
  
}

urlgetUser : string = "/api/user/getUser"
public getUser( usuario: usuario): Observable<Respuesta>{
  return this._http.post<Respuesta>(apiscr + this.urlgetUser, usuario, this.httpOption)
  
}

}
