import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiAuthService } from "../services/api-auth.service";


@Injectable()

export class JwtInterceptor implements HttpInterceptor{

    constructor(private apiauthService: ApiAuthService){
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
        const usuario = this.apiauthService.usuarioData;
        if(usuario){
            console.log("Si hubo que cambiarle al request")
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${usuario.token}`
                }
            });

        }else{
            console.log("NO hubo que cambiarle al request")

        }
       
        return next.handle(req);
    }


}