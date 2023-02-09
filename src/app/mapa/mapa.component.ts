import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Transform } from 'ol/transform';
import { transform } from 'ol/proj';
import { features } from '../models/features';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit{


  propiedad : features = {
    id : 0,
    desarrollo : "",
    desarrollador: "",
    zona: "",
    precioMax :0,
    precioMin: 0,
    tipo: "",
    medidaMin :0,
    medidaMax: 0,
    medidas: "",
    apartado: 0,
    enganche: 0,
    enganche2: 0,
    enganche3: "Consulte un asesor",
    tipoenganche: 0,
    financiamiento: "",
    mantenimiento : "",
    entrega: "",
    entrega2 : "",
    descripcion : "",
    meses : 0,
    imagenes:  "",
    src : ""
  };
  map !: Map;

  @ViewChild('drawer', { static: true }) drawer!: ElementRef;

  @ViewChild('drawer2', { static: true }) drawer2!: ElementRef;
  
  ngOnInit(): void {

    if(this.map){

    }else{
      this.map = new Map({
        view: new View({
          center: transform([-89.625514 , 20.968206 ],  'EPSG:4326', 'EPSG:3857'),
          zoom: 9,
        }),
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        target: 'ol-map'
      });
    }
   
   
  }
}
