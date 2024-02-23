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
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit{


  roles: Rol[] = [
    {value: 0, viewValue: 'ADMINBD'},
    {value: 1, viewValue: 'Administrador'},
    {value: 2, viewValue: 'Asesores'},
   // {value: '3', viewValue: 'Visitante'},
  ];
  
  public userForm = this.formBuilder.group({
    email : ['', Validators.required] ,
    psswrd: [''],
    usuario1: [''],
    nombre: [''],
    apellidos: [''],
    rol: [this.roles[1].value, Validators.required]
  })
  


  
  selectedRol1 = this.roles[0].value;
  selectedRol2 = this.roles[1].value;
 // selectedRol3 = this.roles[2].value;
  selectedRolNull = ""
  public rolForm = this.formBuilder.group({
    rol: [],
  }
  )
  user !: newusuario;
  constructor(private apiauth : ApiAuthService, private formBuilder : FormBuilder,
    private snackBar : MatSnackBar){}
  usuar$ !: Observable<usuario>;
  usuario !: usuario;

  ngOnInit(): void {
   this.getProperties()
    
  }


  getProperties(){
    
    this.usuar$ = this.apiauth.getUsuar$();
    this.usuar$.subscribe( usuar$ => {this.usuario = usuar$ })

    console.log(this.usuario)
    this.apiauth.getUser(this.usuario).subscribe(response =>{
      if(response.exito===1){
         this.user = response.data;
          this.userForm.setValue({email: this.user.email!, psswrd : this.user.psswrd! , usuario1: this.user.usuario1!, 
          nombre: this.user.nombre! , apellidos: this.user.apellidos!, rol: this.user.rol!
          
          })

      }else{

      }
    })
  }

edit(){
  if (  this.userForm.value!== undefined){
  
    console.log(this.userForm.value)
    this.apiauth.edituser(this.userForm.value).subscribe(response =>{
    if(response.exito===1){
      //this.router.navigate(['/'])
      this.snackBar.open("Usuario editado con éxito", '',{
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      this.getProperties();

    }else{

      this.snackBar.open("No se pudo editar el usuario", '',{
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

    }
  })
}


}

}