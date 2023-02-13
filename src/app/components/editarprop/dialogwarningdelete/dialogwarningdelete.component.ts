import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApipropsService } from 'src/app/services/apiprops.service';

@Component({
  selector: 'app-dialogwarningdelete',
  templateUrl: './dialogwarningdelete.component.html',
  styleUrls: ['./dialogwarningdelete.component.css']
})
export class DialogwarningdeleteComponent implements OnInit {


  constructor( public dialogRef : MatDialogRef<DialogwarningdeleteComponent>,
   private apiprops : ApipropsService
    ) { }



    ngOnInit(){

    }


   
}
