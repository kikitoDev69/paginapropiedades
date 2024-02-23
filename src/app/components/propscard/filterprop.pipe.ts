import { Pipe, PipeTransform } from '@angular/core';
import { newPropiedadesDB } from 'src/app/models/newPropiedadesDB';

@Pipe({
  name: 'zoneFilterProp'
})
export class zonePropPipe implements PipeTransform {

  transform(value: Array<string> , query?: string): any {

  
    let val = value;
    if(  query !== undefined ){
      if(query !== null && query.trim().length >0){
        console.log(query)
        val = value?.filter(x => x.toLowerCase().includes(query.toLowerCase()));
  
      }
    }
    
    return val;

  }

}
