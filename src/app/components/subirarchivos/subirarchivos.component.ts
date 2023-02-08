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
  if(files.lenghh===0){
    return;
  }else{
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.apiFile.uploadFile(formData).subscribe(
      event => {

        if(event.type=== HttpEventType.UploadProgress){
          if(event.total)
        {
             this.progress = Math.round(100 * event.loaded / event.total);
         }     

       }else if(event.type=== HttpEventType.Response){

        this.message= 'Carga exitosa';
        this.onUploadFinished.emit(event.body);
       }
      }
    )

    
  }

}
  

}