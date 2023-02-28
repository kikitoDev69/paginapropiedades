import { Pipe, PipeTransform } from '@angular/core';
import { newPropiedadesDB } from 'src/app/models/newPropiedadesDB';

@Pipe({
  name: 'zoneFilter'
})
export class zonePipe implements PipeTransform {

  transform(value?: Array<newPropiedadesDB>, query?: string |unknown): any {

    let val = value;
    if( typeof query === 'string'){
      if(query !== undefined && query.trim().length >0){
        val = value?.filter(x => x.zona?.includes(query));
  
      }
    }
    
    return val;
  }

}
