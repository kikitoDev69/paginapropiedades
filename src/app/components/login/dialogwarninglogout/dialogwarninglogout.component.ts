import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/app/services/api-auth.service';

@Component({
  selector: 'app-dialogwarninglogout',
  templateUrl: './dialogwarninglogout.component.html',
  styleUrls: ['./dialogwarninglogout.component.css']
})
export class DialogwarninglogoutComponent implements OnInit {

  constructor( public dialogRef : MatDialogRef<DialogwarninglogoutComponent>,
    private router: Router, 
    private apiauth: ApiAuthService,
    public snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
  }
  
  close(){
    this.dialogRef.close();
 
  }

  logout(){
   
  this.apiauth.logout();
    this.dialogRef.close();
    this.snackBar.open("Sesión cerrada", '',{
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
