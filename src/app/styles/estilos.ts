     import Style from "ol/style/Style";
     import Icon from "ol/style/Icon";
     import Text from "ol/style/Text";
import Fill from "ol/style/Fill";
import Circle from "ol/style/Circle";
import Stroke from "ol/style/Stroke";
import { Observable } from "rxjs";
import { FeatureserviceService as featureserv} from "../services/featureservice.service";

import { apisrc } from "../security/apissource";


export const myStyle = new Style({
  image: new Circle({
    radius: 7,
    fill: new Fill({color: 'black'}),
    stroke: new Stroke({
      color: [255,0,0], width: 2
    })
  })
})

export const estilosRutas = function (feature : any) {
        const type =  feature.get("id");
      //  console.log(type)
     

        return new Style({
         

          fill: new Fill({
            color: 'green',
           

         }),
          text: new Text({
            text: feature.get("name"),
            font: "italic 17px sans-serif",
            offsetX: 10,
            textAlign: "left",
            fill: new Fill({
              color: 'black'
            }),

        
          }),

          stroke: new Stroke({
          color:  'green',
          width: 3
          }),
        });
      };



      
     export  const estiloDestinos = function (feature: any) {

        const id = feature.get("desarrollo");
     

        return new Style({
 

  text: new Text({
    text: feature.get("desarrollo"),
    font: "17px sans-serif",
    offsetX: 10,
    textAlign: "left",
    fill: new Fill({
      color: 'black'
    }),

    
  }),
  image: new Circle({
    radius: 7,
    fill: new Fill({color: 'black'}),
  
  })


      
      })
    }



    export  const estiloAreas = function  (feature: any)  {

    
      const area = feature.get("area");
    
      const colorTabla = [
        "#ffa43a",
      "#ffbf75",
      "#759eff",
      "#75c7ff",
      "#525558",
      "#a0fb0e",
      "#20c67a",
      "#3f8880",
      "#9dc09d",
      "#f50400",
      "#d6a735",
      "#d6ebc1",
      "#ff8862",
      "#b93af8",
      "#f86f6f",
      "#fe9393",
      "#ff35c2",
      "#ff7dd8",
      "#4fa8fb",
      "#68da3e",
      "#00c6ab",
      "#6aa3b4",
      "#416864",
      "#223026",
      "#68da3e",
      "#00c6ab",
      "#6aa3b4",
      "#416864",
      "#223026",
      "#ef43ef",
      "#ff5f7c",
      "#e6a15c",
      "#9e6788",
      "#394651",
      ];

      return new Style({
image: new Icon({
    src: apisrc +"/Resources/icons/lugar.png",
    color:  colorTabla[area],
    size: [512, 512],
    scale: 0.06,
    opacity: 1,
}),

text: new Text({
  text: feature.get("desarrollo"),
  font: "15px sans-serif",
  offsetX: 20,
  textAlign: "left",
  fill: new Fill({
    color: 'black'
  }),

  

}),



    
    })
  }


    export  const estiloDesarrollos = function  (feature: any)  {

      
      var zonaObs$ : Observable<any> = featureserv.getZonas$();
      var zonasObs !: any;
      zonaObs$.subscribe( usuar$ => {zonasObs = usuar$ ;
      }
      );
    
     // console.log(zonasObs)


      const zone = feature.get("zona");
      // console.log(id)
      // var number = parseInt(id)
    //  console.log(type)
      const colorTabla = [
        "#ffa43a",
      "#ffbf75",
      "#759eff",
      "#75c7ff",
      "#525558",
      "#a0fb0e",
      "#20c67a",
      "#3f8880",
      "#9dc09d",
      "#f50400",
      "#d6a735",
      "#d6ebc1",
      "#ff8862",
      "#b93af8",
      "#f86f6f",
      "#fe9393",
      "#ff35c2",
      "#ff7dd8",
      "#4fa8fb",
      "#68da3e",
      "#00c6ab",
      "#6aa3b4",
      "#416864",
      "#223026",
      "#68da3e",
      "#00c6ab",
      "#6aa3b4",
      "#416864",
      "#223026",
      "#ef43ef",
      "#ff5f7c",
      "#e6a15c",
      "#9e6788",
      "#394651",
      ];

      return new Style({
image: new Icon({
    src: apisrc +"/Resources/icons/lugar.png",
    color:  colorTabla[zonasObs.indexOf(zone)],
    size: [512, 512],
    scale: 0.06,
    opacity: .8,
}),

text: new Text({
  text: feature.get("desarrollo"),
  font: "15px sans-serif",
  offsetX: 20,
  textAlign: "left",
  fill: new Fill({
    color: 'black'
  }),

  

}),



    
    })
  }
