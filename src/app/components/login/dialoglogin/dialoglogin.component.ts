import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/app/services/api-auth.service';

@Component({
  selector: 'app-dialoglogin',
  templateUrl: './dialoglogin.component.html',
  styleUrls: ['./dialoglogin.component.css']
})
export class DialogloginComponent implements OnInit {
  
  public loginForm = this.formBuilder.group({
    email : ['', Validators.required] ,
    psswrd: ['', Validators.required]
  })
  
  ngOnInit(): void {
   
  }


  constructor(public apiAuth: ApiAuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogloginComponent>,
    private snackBar : MatSnackBar){

      // if(this.apiAuth.usuarioData){
      //   this.router.navigate(['/']);
      // } 
    }



  login(){
    if (  this.loginForm.value!== undefined){
  
      this.apiAuth.login(this.loginForm.value).subscribe(response =>{
      if(response.exito===1){
        this.router.navigate(['/'])
        this.snackBar.open("Sesión iniciada con éxito", '',{
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        
  this.dialogRef.close()

      }else{
        this.snackBar.open(`No se pudo iniciar sesión: ${response.mensaje}`, '',{
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

      }
    })
  }
 

 
}


  close(){
    this.dialogRef.close()
  }





}
