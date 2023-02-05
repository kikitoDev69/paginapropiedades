import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAuthService } from '../services/api-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  ngOnInit(): void {
   
  }

  
  public loginForm = this.formBuilder.group({
    email : ['', Validators.required] ,
    psswrd: ['', Validators.required]
  })

 constructor(public apiAuth: ApiAuthService,
  private router: Router,
  private formBuilder: FormBuilder){
    if(this.apiAuth.usuarioData){
      this.router.navigate(['/']);
    } }

  
    login(){
      if (  this.loginForm.value!== undefined){
    
        this.apiAuth.login(this.loginForm.value).subscribe(response =>{
        if(response.exito===1){
          this.router.navigate(['/'])
        }
      })
   
   
    }}


}
