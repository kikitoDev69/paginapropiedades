import { Component, Input, OnInit,  ViewChild, ElementRef} from '@angular/core';

import Map from 'ol/Map.js';
import Overlay from 'ol/Overlay.js';

import {toLonLat} from 'ol/proj.js';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit{

  @Input() map !: Map;
  @ViewChild('popup', { static: true }) popup !: ElementRef;
  @ViewChild('popupcontent', { static: true }) content!: ElementRef;
  @ViewChild('popupcloser', { static: true }) closer!: ElementRef;
  constructor(private elementRef: ElementRef) {
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
     // this.closer.nativeElement.id.blur();
      return false;
    };

    this.map.addOverlay(overlay);
  
    this.map.on('singleclick',  (evt) =>{
      const coordinate = evt.coordinate;
      const hdms = toLonLat(coordinate);
    
     
      
      
      const feature = this.map.forEachFeatureAtPixel(evt.pixel, (feat) => feat);
    if (feature) {
        //const coordinates = feature.getGeometry().getCoordinates();
      //  popup.setPosition(coordinates);
       // this.displayPopup = true;
       console.log(feature)
       this.content.nativeElement.innerHTML = '<p>La posición es:</p><code> '  + feature.get("desarrollo") + '</code>';
       overlay.setPosition(coordinate);
    
    } else {
       // this.displayPopup = false;
    }

   })

  }
   
}
