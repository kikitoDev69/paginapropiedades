     import Style from "ol/style/Style";
     import Icon from "ol/style/Icon";
     import Text from "ol/style/Text";
import Fill from "ol/style/Fill";
import Circle from "ol/style/Circle";
import Stroke from "ol/style/Stroke";

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

            // stroke: new ol.style.Stroke({
            //   color: "green",
            //   width: 3
            // })
          }),

          stroke: new Stroke({
          color:  'green',
          width: 3
          }),
          // fill: new ol.style.Fill({
          // color: 'red'
          // })
        });
      };



      
     export  const estiloDestinos = function (feature: any) {

        const id = feature.get("desarrollo");
        // console.log(id)
        // var number = parseInt(id)
      //  console.log(type)
        // const colorTabla = {
        //   "San José Kuché (Chablekal)": "#27198A",
        //   "Hunucmá - Sisal": "#A7C636",
        //   "Chicxulub Puerto": "#149ECE",
        //   "Baca": "#ED5151",
        //   "Sisal": "#A14A35",
        //   "Conkal": "#A149EC",
        //   "Telchac Puerto": "#F75EC1",
        //   "Temozón Norte": "#517FD6",
        //   "Sitpatch (Cholul)": "#517FD6",
        //   "San Ignacio": "blue"
        // };

        return new Style({
  // image: new Icon({
  //     src: "lugar.png",
  //     color:  'green',
  //     size: [512, 512],
  //     scale: 0.08,
  //     opacity: .6,
  // }),

  text: new Text({
    text: feature.get("desarrollo"),
    font: "17px sans-serif",
    offsetX: 10,
    textAlign: "left",
    fill: new Fill({
      color: 'black'
    }),

    

    // stroke: new ol.style.Stroke({
    //   color: "green",
    //   width: 3
    // })
  }),
  image: new Circle({
    radius: 7,
    fill: new Fill({color: 'black'}),
    // stroke: new Stroke({
    //   color: [255,0,0], width: 2
    // })
  })


      
      })
    }

