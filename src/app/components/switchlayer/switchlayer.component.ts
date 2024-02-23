import { Component, ElementRef, Input } from '@angular/core';
import Map from 'ol/Map';
import LayerSwitcher, {
  Options as LsOptions,
  GroupSelectStyle,
  BaseLayerOptions,
  GroupLayerOptions,
} from "ol-layerswitcher";
import SourceImageArcGISRest from 'ol/source/ImageArcGISRest';
import SourceOSM from 'ol/source/OSM';
import SourceStamen from 'ol/source/Stamen';
import LayerGroup from 'ol/layer/Group';
import LayerImage from 'ol/layer/Image';
import LayerTile from 'ol/layer/Tile';


@Component({
  selector: 'app-switchlayer',
  templateUrl: './switchlayer.component.html',
  styleUrls: ['./switchlayer.component.css']
})
export class SwitchlayerComponent {



  @Input() map !: Map;
  layerbase !: LayerGroup;
  constructor(private elementRef: ElementRef) {




  }

  ngOnInit() {

   this.layerbase =    new LayerGroup({
    'title': 'Mapas',
    layers: [
        new LayerGroup({
            title: 'Color Agua con Ciudades',
            type: 'base',
            combine: true,
            visible: false,
            layers: [
                new LayerTile({
                    source: new SourceStamen({
                        layer: 'watercolor'
                    })
                }),
                new LayerTile({
                    source: new SourceStamen({
                        layer: 'terrain-labels'
                    })
                })
            ]
        } as GroupLayerOptions),
        new LayerTile({
            title: 'Color Agua',
            type: 'base',
            visible: false,
            source: new SourceStamen({
                layer: 'watercolor'
            })
        } as BaseLayerOptions),
        new LayerTile({
            title: 'OSM',
            type: 'base',
            visible: true,
            source: new SourceOSM()
        } as BaseLayerOptions)
    ]
} as GroupLayerOptions)




  this.map.addLayer(this.layerbase)

  const groupStyle: GroupSelectStyle = 'children';

}
}
