import { Pipe, PipeTransform } from '@angular/core';
import { newPropiedadesDB } from 'src/app/models/newPropiedadesDB';

@Pipe({
  name: 'desarrolloFilter'
})
export class desarrolloPropPipe implements PipeTransform {

  transform(value?: Array<newPropiedadesDB>, query?: string |unknown): any {

    let val = value;
    if( typeof query === 'string'){
      if(query !== undefined && query.trim().length >0){
        val = value?.filter(x => x.desarrollo?.toLowerCase().includes(query.toLowerCase()));
  
      }
    }
    
    return val;
  }

  

}
