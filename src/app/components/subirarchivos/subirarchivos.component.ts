import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { createTransformFromCoordinateTransform } from 'ol/proj';
import { ApiFIlesService } from 'src/app/services/api-files.service';

@Component({
  selector: 'app-subirarchivos',
  templateUrl: './subirarchivos.component.html',
  styleUrls: ['./subirarchivos.component.css']
})
export class SubirarchivosComponent implements OnInit {

  public message !: string;
  public progress !: number;

  @Output() public onUploadFinished = new EventEmitter();

constructor(private apiFile : ApiFIlesService){}


  ngOnInit(){

  }

public uploadFile = (files: any) =>{
  if(files.length===0){
    console.log("esto no tiene nada")
    return;
  }else{
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('files', fileToUpload, fileToUpload.name);

    this.apiFile.uploadFile(formData).subscribe(
      response => {
        console.log(response.mensaje)


      }
    )

    
  }

}
  

}