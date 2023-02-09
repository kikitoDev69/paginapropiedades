import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import { ApiAuthService } from 'src/app/services/api-auth.service';
import { DialogwarningloginComponent } from '../components/common/dialogwarninglogin/dialogwarninglogin.component'; 


@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate{

    readonly width: string = '600px';
    constructor(private dialog : MatDialog,
        private router: Router,
        private apiauthservice: ApiAuthService){
        

    }

    canActivate(route: ActivatedRouteSnapshot){
        // console.log('que esta pasando?')
        const usuario = this.apiauthservice.usuarioData;
        if(usuario){
            return true;
        }
        const dialogRef = this.dialog.open(DialogwarningloginComponent, {
            width: this.width
          });
        // this.router.navigate(['login'])

        return false;

    }
    
}