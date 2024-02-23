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
import { ApiAuthService } from 'src/app/services/api-auth.service';
import { usuario } from 'src/app/models/usuario';
import { fileof } from 'src/app/models/fileof';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Transform } from 'ol/transform';
import { transform } from 'ol/proj';
import { ThisReceiver } from '@angular/compiler';


import Vector from 'ol/source/Vector';
import  GeoJSON  from 'ol/format/GeoJSON'

import LayerGroup from 'ol/layer/Group';
import { GroupLayerOptions } from 'ol-layerswitcher';
import {  estiloDesarrollos } from 'src/app/styles/estilos';
import VectorLayer from 'ol/layer/Vector';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorSource from 'ol/source/Vector';
import { apisrcFile } from 'src/app/security/apissource';

@Component({
  selector: 'app-verprop',
  templateUrl: './verprop.component.html',
  styleUrls: ['./verprop.component.css']
})
export class VerpropComponent  implements OnInit{

  feature$ !: Observable<number>;
  apisrc = apisrcFile;
  idfeature !: number;
  Files !: files [];
  propiedadDB !: newPropiedadesDB;

  dateInmediata = 'enero 1990';
  dateseleccionada !: string;
  dateCalendar !: Date;
  

  usuario !: usuario ;
  usuario$ !: Observable<usuario>;

  mapa!: Map;
  vectorSource1 !: Vector;
  // {value: '1', viewValue: 'Icono'},
  //   {value: '2', viewValue: 'Archivo'},
  //   {value: '3', viewValue: 'Link'},
  //   {value: '4', viewValue: 'Portada'},

  constructor(private fservice : FeatureserviceService, private apiprops : ApipropsService,
              private filesservice: ApiFIlesService, private router : Router, 
              private _location : Location, private apiusuario : ApiAuthService
    ){

  }



  ngOnInit(): void {
  this.feature$ = this.fservice.getfeature$();
  this.feature$.subscribe( feature$ => this.idfeature = feature$ );


  this.usuario$ = this.apiusuario.getUsuar$();
  this.usuario$.subscribe( usuar => this.usuario = usuar );
  console.log("La propiedad es: ")
  console.log(this.usuario)

  //this.idfeature =55;

  if(!this.idfeature){
    console.log("no se encntró propiedad, redireccionando")
    this.backClicked()
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


       if(this.propiedadDB.lat && this.propiedadDB.lon){

        let lat : number = Number.parseInt(this.propiedadDB.lat)
        let lon : number = Number.parseInt(this.propiedadDB.lon)

        this.mapa = new Map({
          view: new View({
            center: transform([lat , lon ],  'EPSG:4326', 'EPSG:3857'),
            zoom: 11,
          }),
          layers: [
            new TileLayer({
              source: new OSM(),
            }),
          ],
          target: 'map'
        });

        const desarrolloVector = { "type": "FeatureCollection",
        "features": [
          
    { "type": "Feature",
    "geometry": {"type": "Point", 
    "coordinates":[lon, lat]},
    "properties": {"name": "Desarrollo" }
    }]}

        this.vectorSource1 = new Vector({
          features: (new GeoJSON()).readFeatures(desarrolloVector,
              {featureProjection: this.mapa.getView().getProjection()})
          });



          const  visibleLayer = new VectorLayer(
            {
              title: this.propiedadDB.desarrollo,
              source: this.vectorSource1,
              style: estiloDesarrollos,
              //  style: estilosnuevasrutas,
             declutter: true,
             visible: true
         
            } as GroupLayerOptions
          )

          this.mapa.addLayer(visibleLayer)
       }
      
   
    }else{
        console.log("No se pudo recuperar la info del server");
    }
  })

  }



  obtenerFIles(){

    try{
      var request : fileof =  {email: this.usuario.email, id: this.idfeature};
      console.log(request)
      this.filesservice.getFilesof(request).subscribe(
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
    }catch(Exception ){
      var request : fileof =  {email: null, id: this.idfeature};
      console.log(request)
      this.filesservice.getFilesof(request).subscribe(
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
        console.error("Ocurrió un error" + Exception)
    }
   
  
  
   }

   editar(){
    this.router.navigate(['/edit']);
   }

   backClicked() {
    this._location.back();
  }


}
