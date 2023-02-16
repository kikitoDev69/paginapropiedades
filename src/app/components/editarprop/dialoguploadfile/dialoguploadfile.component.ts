import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiFIlesService } from 'src/app/services/api-files.service';

@Component({
  selector: 'app-dialoguploadfile',
  templateUrl: './dialoguploadfile.component.html',
  styleUrls: ['./dialoguploadfile.component.css']
})



export class DialoguploadfileComponent {

  
  constructor(private formBuilder : FormBuilder,
    @Inject(MAT_DIALOG_DATA) public id : number, private apiFile : ApiFIlesService,
    private snackBar : MatSnackBar,
    public dialogRef : MatDialogRef<DialoguploadfileComponent>){

  }

    public fileform = this.formBuilder.group({
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      link: [''],
    }
    )
  


    

    public uploadFile2 = (files: any, InfoArchivo : InfoArchivo, id : number) =>{


      if(files.length===0){
        console.log("esto no tiene nada")
        return;
      }else{
        let fileToUpload = <File>files[0];
        const formData = new FormData();
        formData.append('files', fileToUpload, fileToUpload.name);
       
        
          formData.append('who', InfoArchivo.nombre! );
       
        
    
          formData.append('Id', ""+id );
        
    
          formData.append('tipo', InfoArchivo.tipo!);
        
          if(InfoArchivo.link){
            
          formData.append('link', InfoArchivo.link);
        
          }
    
        
       
       
        this.apiFile.uploadFile(formData).subscribe(
          response => {
            console.log(response.mensaje)
            if(response.exito===1){
              this.snackBar.open(response.mensaje, '',{
                duration: 2000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
              });
              this.dialogRef.close(true)

            }else{
    
              this.snackBar.open("No se pudo subir el archivo", '',{
                duration: 3000,
                horizontalPosition: 'right',
                verticalPosition: 'top',
            })
            this.dialogRef.close(false)
          //   if(event.type=== HttpEventType.UploadProgress){
          //     if(event.total)
          //   {
          //        this.progress = Math.round(100 * event.loaded / event.total);
          //    }     
    
          //  }else
          //   if(event.type=== HttpEventType.Response){
    
          //   this.message= 'Carga exitosa';
          //   this.onUploadFinished.emit(event.body);
          //  }
          }
        }
        )
    
        
      }
    
    }
    

    
}

 interface InfoArchivo {
  nombre?: string | null | undefined;
  tipo?: string | null  | undefined;
  link? : string |null  | undefined;
}
