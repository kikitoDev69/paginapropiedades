import { formatDate } from '@angular/common';
import { Component, Input, OnInit,  ViewChild, ElementRef, Injectable} from '@angular/core';

import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';
import { transform } from 'ol/proj';
import {clearAllProjections, toLonLat} from 'ol/proj.js';
import View from 'ol/View';
import { Observable, Subject } from 'rxjs';
import { features } from 'src/app/models/features';
import { ApipropsService } from 'src/app/services/apiprops.service';
import { FeatureserviceService } from 'src/app/services/featureservice.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})


export class PopupComponent implements OnInit{

  @Input() map !: Map;
  @Input() drawer !: any;

  @Input() propiedad!: any;
  @ViewChild('popup', { static: true }) popup !: ElementRef;
  @ViewChild('popupcontent', { static: true }) content!: ElementRef;
  @ViewChild('popupcloser', { static: true }) closer!: ElementRef;


  feature$ !: Observable<number>;

  idfeature !: number;

  constructor(private elementRef: ElementRef, private apiprops: ApipropsService, private featureservice : FeatureserviceService) {
  
    
  }



   ngOnInit(){

   
    const overlay = new Overlay({
      element: this.popup.nativeElement,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

     this.closer.nativeElement.onclick = function () {
      overlay.setPosition(undefined);
      //wtf no se por que le tuve que cambiar tanto 
      //this.closer.nativeElement.id.blur();

      return false;
    };

    this.map.addOverlay(overlay);
  
    this.map.on('singleclick',  (evt) =>{
      const coordinate = evt.coordinate;
    //  const hdms = toLonLat(coordinate);
      

      
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, (feat) => feat);
    if (feature) {

      let id = feature.get('id');
    //  console.log("el id es: ")
 //console.log(id)
     // this.featureSubject.next(id);

    this.featureservice.updatefeature(id);

      //consulta de imagen a la API
     this.apiprops.getImage(feature.get("id")).subscribe( Response =>{
      //console.log(Response)
      try{
        var imagen =  Response.features[0].properties;
        var src = imagen.src;
        var image = imagen.imagenes
        this.content.nativeElement.innerHTML +=  '<img src="' + src + image +'" style="max-height: 300px; max-width: 280px; padding-top: 10px" alt="" id="dishPhoto">';

        this.propiedad.src = src;
        this.propiedad.imagenes = image;

        
        this.propiedad.entrega =formatDate( feature.get("entrega2"), "MMMM/YYYY", "es");
    //  console.log(    formatDate( this.propiedad.entrega , "MMMM/YYYY", "es"))
    //  console.log(     typeof(this.propiedad.entrega) )
        
      if( this.propiedad.entrega=== "enero/1990"){
        this.propiedad.entrega="Inmediata";
      }else{
        if( this.propiedad.entrega=== "enero/1970"){
          this.propiedad.entrega="Consulte con asesor";
        }
      }


        this.propiedad.zona = feature.get("zona");
        this.propiedad.tipo = feature.get("tipo");
        this.propiedad.financiamiento = feature.get("financiamiento");
        let engan = feature.get("enganche");
        try {

 
          
          var enganch = (parseFloat(engan) *100)
          console.log("Engance")
          console.log(engan)
        if(engan>100){
          this.propiedad.enganche=parseInt(engan);
          this.propiedad.tipoenganche=1;
        }else {
          this.propiedad.tipoenganche=0;
          this.propiedad.enganche = enganch;
        }
      
        if(Number.isNaN(this.propiedad.enganche)){
      
          this.propiedad.tipoenganche=3;
        }
       
      } catch (error) {
        this.propiedad.tipoenganche=3;
      
      }
        
        this.propiedad.precioMin = feature.get("precioMin");
        this.propiedad.precioMax = feature.get("precioMax");
        this.propiedad.meses = feature.get("meses");
        this.propiedad.medidaMin = feature.get("medidaMin");
        this.propiedad.medidaMax = feature.get("medidaMax");
        this.propiedad.desarrollo = feature.get("desarrollo");
        this.propiedad.desarrollador = feature.get("desarrollador");
        this.propiedad.apartado = feature.get("apartado");
        this.propiedad.descripcion = feature.get("descripción");



      }  catch(error){

        console.log(error)
        console.log("no existe imagen para cargar")
// cargar todo menos la imagene
this.propiedad.src = "";
this.propiedad.imagenes = "";
this.propiedad.entrega =formatDate( feature.get("entrega2"), "MMMM/YYYY", "es");
console.log(    formatDate( this.propiedad.entrega , "MMMM/YYYY", "es"))
console.log(     typeof(this.propiedad.entrega) )

if( this.propiedad.entrega=== "enero/1990"){
this.propiedad.entrega="Inmediata";
}else{
if( this.propiedad.entrega=== "enero/1970"){
  this.propiedad.entrega="Consulte con asesor";
}
}


this.propiedad.zona = feature.get("zona");
this.propiedad.tipo = feature.get("tipo");
this.propiedad.financiamiento = feature.get("financiamiento");
let engan = feature.get("enganche");
try {

 
          
    var enganch = (parseFloat(engan) *100)
    console.log("Engance")
    console.log(engan)
  if(engan>100){
    this.propiedad.enganche=parseInt(engan);
    this.propiedad.tipoenganche=1;
  }else {
    this.propiedad.tipoenganche=0;
    this.propiedad.enganche = enganch;
  }

  if(Number.isNaN(this.propiedad.enganche)){

    this.propiedad.tipoenganche=3;
  }
 
} catch (error) {
  this.propiedad.tipoenganche=3;

}

this.propiedad.precioMin = feature.get("precioMin");
this.propiedad.precioMax = feature.get("precioMax");
this.propiedad.meses = feature.get("meses");
this.propiedad.medidaMin = feature.get("medidaMin");
this.propiedad.medidaMax = feature.get("medidaMax");
this.propiedad.desarrollo = feature.get("desarrollo");
this.propiedad.desarrollador = feature.get("desarrollador");
this.propiedad.apartado = feature.get("apartado");
this.propiedad.descripcion = feature.get("descripcion");


      }
     }
      )
      

        //const coordinates = feature.getGeometry().getCoordinates();
      //  popup.setPosition(coordinates);
       // this.displayPopup = true;
   //    console.log(feature)

   //se asigna el contenido al popup
       this.content.nativeElement.innerHTML =
        '<p>Desarrollo:  '  + feature.get("desarrollo") + 
        '</p> <p>En: ' + feature.get("zona") +
        '</p> <p> ' + feature.get("tipo") +
        '</p> ' 
        //+       '<img src="' + feature.get('src') + feature.get('imagenes') +'" style="max-height: 300px; max-width: 280px; padding-top: 10px" alt="" id="dishPhoto">'
        ;
       overlay.setPosition(coordinate);
  
    if(this.drawer.opened){
      console.log("ES VISIBLE NO HACER NADA")
    }else{
      this.drawer.toggle()
     
    }
  



    } else {
       // this.displayPopup = false;
    }

   })

  }
   
}
