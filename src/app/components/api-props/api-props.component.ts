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


  constructor( private apiProps : ApipropsService){
    
  }
  ngOnInit(): void {
    


    const propscapa = new LayerGroup({
            'title': 'Propiedades en Yucatán',
            layers: []
          } as GroupLayerOptions);
    this.map.addLayer(propscapa);


 



    this.apiProps.getProps().subscribe( response =>{
      console.log(response)


    const vectorSource2 = new Vector({
        features: (new GeoJSON()).readFeatures(response,
            {featureProjection: this.map.getView().getProjection()})
        });

        console.log(vectorSource2)
        
        
        propscapa.getLayers().push(
          new VectorLayer({
           title: 'Propiedades a la venta',
               source: vectorSource2,
               style: estiloDestinos,
               //  style: estilosnuevasrutas,
              declutter: true
           } as GroupLayerOptions)
           )


           console.log("Se terminó el proceso de propiedades");
    }
    )
   
    
   

   


            
              

  }

}
