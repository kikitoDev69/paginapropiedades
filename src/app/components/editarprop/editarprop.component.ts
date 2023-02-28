import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ObjectEvent } from 'ol/Object';
import { Observable } from 'rxjs';
import { files } from 'src/app/models/file';
import { propiedadesDB } from 'src/app/models/propiedadesDB';

import { newPropiedadesDB } from 'src/app/models/newPropiedadesDB';
import { props } from 'src/app/models/props';
import { ApiFIlesService } from 'src/app/services/api-files.service';
import { ApipropsService } from 'src/app/services/apiprops.service';
import { FeatureserviceService } from 'src/app/services/featureservice.service';
import { PopupComponent } from '../popup/popup.component';
import { DialoguploadfileComponent } from './dialoguploadfile/dialoguploadfile.component';
import { DialogwarnigneditComponent } from './dialogwarnignedit/dialogwarnignedit.component';
import { DialogwarningdeleteComponent } from './dialogwarningdelete/dialogwarningdelete.component';

@Component({
  selector: 'app-editarprop',
  templateUrl: './editarprop.component.html',
  styleUrls: ['./editarprop.component.css']
})
export class EditarpropComponent implements OnInit {

  Files !: files [];
  feature$ !: Observable<number>;
  apisrc : string = "https://localhost:44335/"
  idfeature !: number;

  descrip = new FormControl(''); 
  readonly width: string = '300';
  propiedades !: props;
// 
  propiedadDB : newPropiedadesDB = {
    id: 0,
    desarrollo: '',
    desarrollador: '',
    zona: '',
    precioMin: 0,
    precioMax: 0,
    tipo: '',
    apartado: 0,
    enganche: '',
    formasDePago: '',
    meses: 0,
    financiamiento: '',
    mantenimiento: '',
    entrega: new DatePipe(""),
    disponibilidad: 0,
    lat: '',
    lon: '',
    descripcion: '',
    medidasMin: 0,
    medidasMax: 0
  };

  nuevopropiedadDB : newPropiedadesDB = {
    id: 0,
    desarrollo: '',
    desarrollador: '',
    zona: '',
    precioMin: 0,
    precioMax: 0,
    tipo: '',
    apartado: 0,
    enganche: '',
    formasDePago: '',
    meses: 0,
    financiamiento: '',
    mantenimiento: '',
    entrega: new DatePipe(""),
    disponibilidad: 0,
    lat: '',
    lon: '',
    descripcion: '',
    medidasMin: 0,
    medidasMax: 0
  };
  date: FormControl =  new FormControl( '');

  constructor(private fservice : FeatureserviceService,  
     private apiprops : ApipropsService, private filesservice :ApiFIlesService,
     private dialog : MatDialog, private snackBar : MatSnackBar, private apiFile : ApiFIlesService,
     private _location : Location){}


  getFiles(id : string): any{
  
    this.filesservice.getFiles(id).subscribe(
response =>
{
  if(response.exito ===1){
    console.log(response.data)
      
    return response.data;

  }else{
    return null;
  }
}

    )


  }


ngOnInit(){

  this.feature$ = this.fservice.getfeature$();
  this.feature$.subscribe( feature$ => this.idfeature = feature$ );
  // this.idfeature = this.popup.datafeature

  //es un objeto
//   this.propiedades = this.apiprops.featureData.features
//   console.log(this.propiedades)
// if(this.propiedades){

//   if(this.propiedades && this.idfeature){}
//     //existen propiedades, hay que buscarlas
//     // console.log(this.propiedades)
//     // console.log(this.idfeature)
    
//     // lo convertimos en array para poder usar el filter 
//     var propiedaduno = Object.values(this.propiedades)

//     // obtenemos la propiedad que tiene el id
//     var propiedad = propiedaduno.filter( x => x.properties.id == this.idfeature)

//     //console.log(propiedad)

//   //vaciamos la información en un objeto de tipo propiedades Db que es el que tiene nuestro api

//     this.propiedadDB.Apartado = propiedad[0].properties.apartado;
//     this.propiedadDB.Desarrollador = propiedad[0].properties.desarrollador;
//     this.propiedadDB.Desarrollo = propiedad[0].properties.desarrollo;
//     this.propiedadDB.Descripcion = propiedad[0].properties.descripcion;
//     this.propiedadDB.Enganche = propiedad[0].properties.enganche;

//     this.propiedadDB.Entrega = propiedad[0].properties.entrega2;
//     this.propiedadDB.Financiamiento = propiedad[0].properties.financiamiento;
//     this.propiedadDB.Id = propiedad[0].properties.id;
//     this.propiedadDB.Mantenimiento = propiedad[0].properties.mantenimiento;
//     this.propiedadDB.MedidasMax = propiedad[0].properties.medidaMax;
//     this.propiedadDB.MedidasMin = propiedad[0].properties.medidaMin;
//     this.propiedadDB.Meses = propiedad[0].properties.meses;
//     this.propiedadDB.PrecioMax = propiedad[0].properties.precioMax;
//     this.propiedadDB.PrecioMin = propiedad[0].properties.precioMin;
//     this.propiedadDB.Tipo = propiedad[0].properties.tipo;
//     this.propiedadDB.Zona = propiedad[0].properties.zona;
//     this.propiedadDB.Lat = propiedad[0].geometry.coordinates[1];
//     this.propiedadDB.Lon = propiedad[0].geometry.coordinates[0];
// //  Disponibilidad : number,
// //brochure

// //console.log(this.propiedadDB)
  
//   this.nuevopropiedadDB = this.propiedadDB;

//   //console.log(this.nuevopropiedadDB)
  
//   this.date.setValue(this.nuevopropiedadDB.Entrega);
//   this.descrip.setValue(this.nuevopropiedadDB.Descripcion);
// }else{

   this.apiprops.getProp(this.idfeature).subscribe(response =>{
    if(response.exito===1){
      this.propiedadDB = response.data
    //  console.log(this.propiedadDB)
      this.nuevopropiedadDB = this.propiedadDB
      // console.log(this.nuevopropiedadDB)
      // console.log(this.nuevopropiedadDB.desarrollo)
      this.date.setValue(this.nuevopropiedadDB.entrega);
      this.descrip.setValue(this.nuevopropiedadDB.descripcion);
    }else{
        console.log("No se pudo recuperar la info del server");
    }
  })






/// obtener los archivos 
this.obtenerFIles();
  
      
    // this.Files = this.getFiles(""+ this.idfeature)
    // if(this.Files){

    //   console.log(this.Files)

    // }

 }
    
 obtenerFIles(){
  this.filesservice.getFiles(""+this.idfeature).subscribe(
    response =>
    {
      console.log(response)
      if(response.exito ===1){
        console.log(response.data)
        this.Files = response.data
      console.log(this.Files)
    
      }else{
       this.Files = [];
      }
    })


 }


 ver(){
 // console.log(this.date)
  this.nuevopropiedadDB.entrega = this.date.value
  //console.log(this.nuevopropiedadDB)
  this.nuevopropiedadDB.lat = ""+this.nuevopropiedadDB.lat
  this.nuevopropiedadDB.lon = ""+this.nuevopropiedadDB.lon
  this.enviarEdit(this.nuevopropiedadDB)

 }

 enviarEdit(nuevaprop : newPropiedadesDB){
  const dialogRef = this.dialog.open(DialogwarnigneditComponent, {
    width: this.width,
   
  })
  dialogRef.afterClosed().subscribe(result => {
    if(result){
   
      this.apiprops.editProp(nuevaprop).subscribe(response =>{
        if(response.exito===1){
          this.snackBar.open('Propiedad editada con éxito', '', {
            duration: 2000
          })
          
        }else{
          this.snackBar.open('Error al editar propiedad', '', {
            duration: 3000
          })
        }
      })

    }
  })


 }

 eliminar(){
  const dialogRef = this.dialog.open(DialogwarningdeleteComponent, {
    width: this.width,
   
  })
  dialogRef.afterClosed().subscribe(result => {
    if(result){
      const id = { "Id" : this.nuevopropiedadDB.id}
      this.apiprops.deleteProp(id).subscribe(response =>{
        if(response.exito===1){
          this.snackBar.open('Propiedad eliminada con éxito', '', {
            duration: 2000
          })
          
        }else{
          this.snackBar.open('Error al eliminar propiedad', '', {
            duration: 3000
          })
        }
      })

    }
  })
}

public uploadFile(){
  const dialogRef = this.dialog.open(DialoguploadfileComponent, {
    width: this.width,
    data: this.idfeature
  })
  dialogRef.afterClosed().subscribe(result => {
   
    if(result){
      this.obtenerFIles();
    }
   
  }
  )



}


public uploadFile2 = (files: any, who: string, id : number) =>{
  if(files.length===0){
    console.log("esto no tiene nada")
    return;
  }else{
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('files', fileToUpload, fileToUpload.name);
   
    console.log(who)
    console.log(id)
    if(who){
      formData.append('who', who );
    }else{
      formData.append('who', 'precios' );
    }

    if(id){
      formData.append('Id', ""+id );
    }else{
      formData.append('Id', "35" );
    }

      formData.append('tipo', "2");
    

    
   
   
    this.apiFile.uploadFile(formData).subscribe(
      response => {
        console.log(response.mensaje)
        if(response.exito===1){
          this.snackBar.open(response.mensaje, '',{
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.obtenerFIles();
        }else{

          this.snackBar.open("No se pudo subir el archivo", '',{
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
        })
       
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


public deleteFile(id : number){
  const dialogRef = this.dialog.open(DialogwarningdeleteComponent, {
    width: this.width,
   
  })
  dialogRef.afterClosed().subscribe(result => {
    if(result){
   
      this.apiFile.deleteFile(id).subscribe(response =>{
        if(response.exito===1){
          this.snackBar.open('Archivo eliminada con éxito', '', {
            duration: 2000
          })
          
          this.obtenerFIles()
        }else{
          this.snackBar.open('Error al eliminar propiedad', '', {
            duration: 3000
          })
        }
      })

    }
  })



}



backClicked() {
  this._location.back();
}

    }









    


  

