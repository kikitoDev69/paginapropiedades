import {  Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from './models/usuario';
import { ApiAuthService } from './services/api-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'open-angular';

constructor( private authserv : ApiAuthService){



}
usuar$ !: Observable<usuario>;

  usuario !: usuario;

  ngOnInit(): void {
    
    this.usuar$ = this.authserv.getUsuar$();
    this.usuar$.subscribe( usuar$ => {this.usuario = usuar$ ;

         }
    );
   
  }


}
