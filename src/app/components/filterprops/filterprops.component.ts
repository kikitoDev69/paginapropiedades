import { Component, ElementRef, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import Vector from 'ol/source/Vector';

@Component({
  selector: 'app-filterprops',
  templateUrl: './filterprops.component.html',
  styleUrls: ['./filterprops.component.css']
})
export class FilterpropsComponent {
  pokemonControl = new FormControl();
 @Input() public vectorSource1 !: Vector;
 @Input() public vectorSource2 !: Vector;
@Input() public Propiedades !: any[];

 value = "";
 value2 = "";
 value3 = "0";
 value4 = "0";
 value5 = "";
 value6 = "";
 zonas : Set<string> =new Set();
zonaselected : string  ="";
 constructor(private elementRef: ElementRef) {

 
 }

  obtenerzonas(){
    if(this.Propiedades !== undefined){
      if(this.zonas.size ===0){
       // console.log("propiedaeds")
        //console.log(this.Propiedades)
        var prop :any
        for(prop of this.Propiedades){
          this.zonas.add(prop.properties.zona)
        }
      //  console.log(this.zonas)
      }
    }else{

    }
   

    
  }
 

  updateVisibleLayer = (filterCriteria : string, filterCriterio2: string, filterCriterio3: string, filterCriterio4: string, filterCriterio5: string, crit6: string) => {
    // Clear the source before adding data
    this.vectorSource1.clear();

    

    // Your filter
    const myFilter = (query :string , query2: string, query3 : string, query4:string, query5:string, query6: string) => {
      console.log(this.vectorSource2.getFeaturesCollection)

        return this.vectorSource2.getFeatures()
                                .filter(feature =>
            feature.get('zona').toLowerCase().indexOf(query.toLowerCase()) > -1 &&   
            feature.get('desarrollo').toLowerCase().indexOf(query6.toLowerCase()) > -1 &&  
            feature.get('tipo').toLowerCase().indexOf(query2.toLowerCase()) > -1 &&
            feature.get('desarrollador').toLowerCase().indexOf(query5.toLowerCase()) > -1   &&
                parseInt(feature.get('precioMin')) >= parseInt(query3)  
    )};

    const myFilter2 = (query :string , query2: string, query3 : string, query4:string, query5: string, query6: string) => {
      console.log(this.vectorSource2.getFeaturesCollection)

        return this.vectorSource2.getFeatures()
                                .filter(feature => feature.get("precioMax")?
            feature.get('zona').toLowerCase().indexOf(query.toLowerCase()) > -1 &&
            feature.get('desarrollo').toLowerCase().indexOf(query6.toLowerCase()) > -1 &&
              feature.get('tipo').toLowerCase().indexOf(query2.toLowerCase()) > -1 &&
                feature.get('desarrollador').toLowerCase().indexOf(query5.toLowerCase()) > -1  &&
                  parseInt(feature.get('precioMin')) >= parseInt(query3)  &&
                    parseInt(feature.get('precioMax')) <= parseInt(query4) : feature.get('zona').toLowerCase()
                   .indexOf(query.toLowerCase()) > -1 &&  feature.get('desarrollador').toLowerCase()
                   .indexOf(query5.toLowerCase()) > -1  &&  feature.get('tipo').toLowerCase()
                   .indexOf(query2.toLowerCase()) > -1 &&  parseInt(feature.get('precioMin')) <= parseInt(query4)   
    )};

    var min = parseInt(filterCriterio3);
    var max = parseInt(filterCriterio4);

    if(min < max){

    }else{
      filterCriterio4 = ""+Number.MAX_VALUE;
    }
    console.log(filterCriterio3)
    console.log(filterCriterio4)

    // Add the features to your visible layer, using myFilter
    if(max===0){
      this.vectorSource1.addFeatures(myFilter(filterCriteria , filterCriterio2, filterCriterio3, filterCriterio4, filterCriterio5, crit6));
    }else{
      this.vectorSource1.addFeatures(myFilter2(filterCriteria , filterCriterio2, filterCriterio3, filterCriterio4, filterCriterio5, crit6));
    }
   

}



}
