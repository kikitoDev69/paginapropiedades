import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Login } from '../models/login';
import { Respuesta } from '../models/respuesta';
import { usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

 


  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  url: string = 'https://localhost:44335/api/User/login'

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



   login(login: Login): Observable<Respuesta>{
    return this._http.post<Respuesta>(this.url, login, this.httpOption)
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


logout(){
  localStorage.removeItem('usuario');
  this.usuarioSubject.next(null!)
}

}
