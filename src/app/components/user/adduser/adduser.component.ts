import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { newusuario } from 'src/app/models/newusuario';
import { usuario } from 'src/app/models/usuario';
import { ApiAuthService } from 'src/app/services/api-auth.service';

interface Rol {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit{


  roles: Rol[] = [
   
    {value: 1, viewValue: 'Administrador'},
    {value: 2, viewValue: 'Asesores'},
   // {value: '3', viewValue: 'Visitante'},
  ];

  public userForm = this.formBuilder.group({
    email : ['', Validators.required] ,
    psswrd: ['', Validators.required],
    usuario1: [''],
    nombre: [''],
    apellidos: [''],
    rol: [this.roles[1].value, Validators.required]
  })
  
  user !: newusuario;
  constructor(private apiauth : ApiAuthService, private formBuilder : FormBuilder,
    private snackBar : MatSnackBar){}
  usuar$ !: Observable<usuario>;
  usuario !: usuario;


  

  ngOnInit(): void {
  
    
  }



add(){
  if (  this.userForm.value!== undefined){
    
    this.apiauth.adduser(this.userForm.value).subscribe(response =>{
    if(response.exito===1){
      //this.router.navigate(['/'])
      this.snackBar.open("Usuario añadido con éxito", '',{
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      

    }else{
      this.snackBar.open("El suario no se pudo añadir", '',{
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  })
}


}

}
