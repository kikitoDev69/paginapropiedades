import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogloginwarning',
  templateUrl: './dialogwarninglogin.component.html',
  styleUrls: ['./dialogwarninglogin.component.scss']
})
export class DialogwarningloginComponent implements OnInit {

  constructor( public dialogRef : MatDialogRef<DialogwarningloginComponent>,
    private router: Router
    ) { }

  ngOnInit(): void {
  }


  close(){
    this.dialogRef.close();
   this.router.navigate(['mapa'])
  }

  iniciar(){
    this.dialogRef.close();
    this.router.navigate(['login'])
  
  }
}
