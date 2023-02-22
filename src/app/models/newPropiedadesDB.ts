import { DatePipe } from "@angular/common";

export interface newPropiedadesDB {

    id : number |null;
    desarrollo :string|null ,
    desarrollador : string |null,
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
    medidasMax : number|null,
    imagenesprueba ?: any | null,
    files ?: any[] | null


}
