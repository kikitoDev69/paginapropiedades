import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Transform } from 'ol/transform';
import { transform } from 'ol/proj';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit{


  map !: Map;

  

  ngOnInit(): void {
   
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
