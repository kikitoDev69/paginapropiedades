import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { usuario } from 'src/app/models/usuario';
import { ApiAuthService } from '../../services/api-auth.service';
import { DialogloginComponent } from './dialoglogin/dialoglogin.component';
import { DialogwarninglogoutComponent } from './dialogwarninglogout/dialogwarninglogout.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  loginfrase !: string;

  usuar$ !: Observable<usuario>;

  usuario !: usuario;

  ngOnInit(): void {
    
    this.usuar$ = this.apiAuth.getUsuar$();
    this.usuar$.subscribe( usuar$ => this.usuario = usuar$
    );
   

  if(this.usuario){
    this.loginfrase = "Cerrar Sesión"
   
    }else{
      this.loginfrase = "Iniciar Sesión"
      
   
    }  
  }

  
  readonly width: string = '300';

  

 constructor(public apiAuth: ApiAuthService,
  private router: Router,
  private formBuilder: FormBuilder,
  public dialog: MatDialog){
    
  //   if(this.apiAuth.usuarioData){
     

  // this.usuario = true;
  // this.loginfrase = "Cerrar Sesión"

  //   } 
  
  
  
  
  }

  
    
  openLogin(){
    
    const dialogRef = this.dialog.open(DialogloginComponent, {
      width: this.width
    })
    dialogRef.afterClosed().subscribe(result => {
      this.usuario ? this.loginfrase = "Cerrar Sesión" : this.loginfrase = "Iniciar Sesión"
    })
  }

  logout(){
    
    const dialogRef = this.dialog.open(DialogwarninglogoutComponent, {
      width: this.width
    })
    dialogRef.afterClosed().subscribe(result => {
      this.usuario ? this.loginfrase = "Cerrar Sesión" : this.loginfrase = "Iniciar Sesión"
          
       
        
    })
  }



}
