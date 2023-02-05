import { Component, Input, OnInit } from '@angular/core';
import Map from 'ol/Map';
import Vector from 'ol/source/Vector';
import { ApipropsService } from 'src/app/services/apiprops.service';
import  GeoJSON  from 'ol/format/GeoJSON'

import LayerGroup from 'ol/layer/Group';
import { GroupLayerOptions } from 'ol-layerswitcher';
import { estiloDestinos, estilosRutas, myStyle } from 'src/app/estilos/estilos';
import VectorLayer from 'ol/layer/Vector';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorSource from 'ol/source/Vector';


@Component({
  selector: 'app-api-props',
  templateUrl: './api-props.component.html',
  styleUrls: ['./api-props.component.css']
})
export class ApiPropsComponent implements OnInit{

  @Input() map !: Map

  

 vectorSource1 !: Vector;
 vectorSource2 !: Vector;
  Propiedades !: any[];
  constructor( private apiProps : ApipropsService){
    
  }
  ngOnInit(): void {
    

    const propscapa = new LayerGroup({
            'title': 'Propiedades en Yucatán',
            layers: []
          } as GroupLayerOptions);
    this.map.addLayer(propscapa);


 



    this.apiProps.getProps().subscribe( response =>{
    
      //  console.log(response.features)
      this.Propiedades = response.features

     this.vectorSource1 = new Vector({
        features: (new GeoJSON()).readFeatures(response,
            {featureProjection: this.map.getView().getProjection()})
        });

        this.vectorSource2 = new Vector({
          features: (new GeoJSON()).readFeatures(response,
              {featureProjection: this.map.getView().getProjection()})
          });

    
       const  visibleLayer = new VectorLayer(
          {
            title: 'Propiedades a la venta',
            source: this.vectorSource1,
            style: estiloDestinos,
            //  style: estilosnuevasrutas,
           declutter: true,
           visible: true
       
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
           visible: false
       
          } as GroupLayerOptions
        )
          
        propscapa.getLayers().push(
          hiddenLayer       )

   


           console.log("Se terminó el proceso de propiedades");





    }
    )
  }







}
