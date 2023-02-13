import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogloginComponent } from '../../login/dialoglogin/dialoglogin.component';

@Component({
  selector: 'app-dialogloginwarning',
  templateUrl: './dialogwarninglogin.component.html',
  styleUrls: ['./dialogwarninglogin.component.css']
})
export class DialogwarningloginComponent implements OnInit {
  readonly width: string = '300';


  constructor( public dialogRef : MatDialogRef<DialogwarningloginComponent>,
    private router: Router, private dialog : MatDialog
    ) { }

  ngOnInit(): void {
  }


  close(){
    this.dialogRef.close();
   this.router.navigate(['mapa'])
  }

  iniciar(){
    this.dialogRef.close();
   // this.router.navigate(['login'])
   const dialogRef = this.dialog.open(DialogloginComponent, {
    width: this.width
  })
  dialogRef.afterClosed().subscribe(result => {

  })
  }
}
