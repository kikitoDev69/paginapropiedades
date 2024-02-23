import { Component, Input, OnInit } from '@angular/core';
import Map from 'ol/Map';
import Vector from 'ol/source/Vector';
import { ApipropsService } from 'src/app/services/apiprops.service';
import  GeoJSON  from 'ol/format/GeoJSON'

import LayerGroup from 'ol/layer/Group';
import { GroupLayerOptions } from 'ol-layerswitcher';
import { estiloAreas, estiloDesarrollos, estiloDestinos, estilosRutas, myStyle } from 'src/app/styles/estilos';
import VectorLayer from 'ol/layer/Vector';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorSource from 'ol/source/Vector';
import { FeatureserviceService } from 'src/app/services/featureservice.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-api-props',
  templateUrl: './api-props.component.html',
  styleUrls: ['./api-props.component.css']
})



export class ApiPropsComponent implements OnInit{

  @Input() map !: Map

  zonas = new Set();
  zonas2 = new Map()
  zonasArray !: string [];
 
  zonaObs$ !: Observable<any>;
  zonasObs !: any;

 vectorSource1 !: Vector;
 vectorSource2 !: Vector;
  Propiedades !: any[];
  constructor( private apiProps : ApipropsService, private featureService : FeatureserviceService){
    
  }


  ngOnInit(): void {
    

    const propscapa = new LayerGroup({
            'title': 'Propiedades en Yucatán',
            layers: []
          } as GroupLayerOptions);
    this.map.addLayer(propscapa);


 



    this.apiProps.getProps().subscribe( response =>{
    
      this.Propiedades = response.data.features
     
      this.Propiedades.forEach(element=> {
       
        if(element.properties.zona !==null){
          this.zonas.add(element.properties.zona)
        
        }
        
        
      });
      this.zonasArray = Array.from(this.zonas) as string []
     
      this.featureService.updateZonase(this.zonasArray)
      
      



     this.vectorSource1 = new Vector({
        features: (new GeoJSON()).readFeatures(response.data,
            {featureProjection: this.map.getView().getProjection()})
        });

        this.vectorSource2 = new Vector({
          features: (new GeoJSON()).readFeatures(response.data,
              {featureProjection: this.map.getView().getProjection()})
          });

    
       const  visibleLayer = new VectorLayer(
          {
            title: 'Propiedades a la venta',
            source: this.vectorSource1,
            style: estiloDesarrollos,
            //  style: estilosnuevasrutas,
           declutter: true,
           visible: true,
           renderBuffer: 512
       
          } as GroupLayerOptions
        )
      
        
        propscapa.getLayers().push(
         visibleLayer       )

         const  hiddenLayer = new VectorLayer(
          {
            title: 'Propiedades a la venta',
            source: this.vectorSource2,
            style: estiloDestinos,
            //  style: estilosnuevasrutas,
           declutter: true,
           visible: false,
           renderBuffer: 512
       
          } as GroupLayerOptions
        )
          
        propscapa.getLayers().push(
          hiddenLayer       )

   
          const  hiddenLayer2 = new VectorLayer(
            {
              title: 'Propiedades por área',
              source: this.vectorSource1,
              style: estiloAreas,
              //  style: estilosnuevasrutas,
             declutter: true,
             visible: false,
               renderBuffer: 512
         
            } as GroupLayerOptions
          )
            
          propscapa.getLayers().push(
            hiddenLayer2       )


           console.log("Se terminó el proceso de propiedades");





    }
    )
  }







}
