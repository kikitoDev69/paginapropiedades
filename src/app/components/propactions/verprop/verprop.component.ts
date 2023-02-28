import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { files } from 'src/app/models/file';
import { newPropiedadesDB } from 'src/app/models/newPropiedadesDB';
import { ApiFIlesService } from 'src/app/services/api-files.service';
import { ApipropsService } from 'src/app/services/apiprops.service';
import { FeatureserviceService } from 'src/app/services/featureservice.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-verprop',
  templateUrl: './verprop.component.html',
  styleUrls: ['./verprop.component.css']
})
export class VerpropComponent  implements OnInit{

  feature$ !: Observable<number>;
  apisrc : string = "https://localhost:44335/"
  idfeature !: number;
  Files !: files [];
  propiedadDB !: newPropiedadesDB;

  dateInmediata = 'enero 1990';
  dateseleccionada !: string;
  dateCalendar !: Date;
  
  // {value: '1', viewValue: 'Icono'},
  //   {value: '2', viewValue: 'Archivo'},
  //   {value: '3', viewValue: 'Link'},
  //   {value: '4', viewValue: 'Portada'},

  constructor(private fservice : FeatureserviceService, private apiprops : ApipropsService,
              private filesservice: ApiFIlesService, private router : Router, private _location : Location
    ){

  }



  ngOnInit(): void {
  this.feature$ = this.fservice.getfeature$();
  this.feature$.subscribe( feature$ => this.idfeature = feature$ );

  //this.idfeature =55;

  if(!this.idfeature){
    this.router.navigate(['/mapa'])
  }else{

    this.obtenerInfo()
    this.obtenerFIles()

  }

  
  }


  obtenerInfo(){
      
  this.apiprops.getProp(this.idfeature).subscribe(response =>{
    if(response.exito===1){
      this.propiedadDB = response.data
      console.log(this.propiedadDB)
    //  console.log(this.propiedadDB)
      // console.log(this.nuevopropiedadDB)
      // console.log(this.nuevopropiedadDB.desarrollo)
      // this.date.setValue(this.nuevopropiedadDB.entrega);
      // this.descrip.setValue(this.nuevopropiedadDB.descripcion);
      console.log(typeof(this.propiedadDB.entrega))

      //formatDate( this.propiedadDB.entrega, "MMMM/YYYY", "es");
      if(this.propiedadDB.entrega !== null){
        this.dateseleccionada  = formatDate( ''+this.propiedadDB.entrega, "MMMM YYYY", "es");
        this.dateCalendar  =  new Date(''+this.propiedadDB.entrega);
        console.log(this.dateCalendar)
      }
      
       console.log(this.propiedadDB.entrega )
       console.log(this.dateseleccionada )
   
    }else{
        console.log("No se pudo recuperar la info del server");
    }
  })

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

   backClicked() {
    this._location.back();
  }


}
