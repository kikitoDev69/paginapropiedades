import { DatePipe } from "@angular/common";

export interface newPropiedadesDB {

    id : number |null;
    desarrollo :string|null ,
    constructora : string |null,
    distribuidora : string |null,
    zona : string |null,
    precioMin : number|null,
    precioMax : number|null,
    tipo : string|null,
    apartado : number|null,
    enganche : string|null,
    formasDePago : string|null,
    meses : number|null,
    financiamiento : string|null,
    mantenimiento : string|null,
    entrega : DatePipe|null,
    disponibilidad : number|null,
    lat : string|null,
    lon : string|null,
    descripcion : string |null,
    medidasMin : number|null,
    medidas : string|null,
    medidasMax : number|null,
    link : string|null,
    crm : string|null,
    machotes : string|null,
    otro : string|null,
    area : number|null,
    files ?: any[] | null


}
