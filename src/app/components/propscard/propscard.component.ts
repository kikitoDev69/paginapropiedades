import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { newPropiedadesDB } from 'src/app/models/newPropiedadesDB';
import { propiedadesDB } from 'src/app/models/propiedadesDB';
import { usuario } from 'src/app/models/usuario';
import { ApiAuthService } from 'src/app/services/api-auth.service';
import { ApiFIlesService } from 'src/app/services/api-files.service';
import { ApipropsService } from 'src/app/services/apiprops.service';
import { FeatureserviceService } from 'src/app/services/featureservice.service';
import { ApiPropsComponent } from '../api-props/api-props.component';
import { apisrcFile as apisrc } from 'src/app/security/apissource';
import { files } from 'src/app/models/file';


@Component({
  selector: 'app-propscard',
  templateUrl: './propscard.component.html',
  styleUrls: ['./propscard.component.css']
})
export class PropscardComponent implements OnInit{

 propiedades : newPropiedadesDB [] = []

  zonas = new Set();
  zonas2 = new Map()
  zonasArray !: string [];
  usuar$ !: Observable<usuario>;
  usuario !: usuario;
  
  apiscr = apisrc;
  portadas : files [] = []

  isReadMore: boolean = true;
  medidas: boolean =true;
  descripcion: boolean =false;
  tipos: boolean =true;
  precios: boolean =true;


  refProp : newPropiedadesDB ={
    id: null,
    desarrollo: null,
    zona: null,
    precioMin: null,
    precioMax: null,
    tipo: null,
    apartado: null,
    enganche: null,
    formasDePago: null,
    meses: null,
    financiamiento: null,
    mantenimiento: null,
    entrega: null,
    disponibilidad: null,
    lat: null,
    lon: null,
    descripcion: null,
    medidasMin: null,
    medidasMax: null,
    constructora: null,
    distribuidora: null,
    link: null,
    crm: null,
    machotes: null,
    otro: null,
    area: null,
    medidas: null
  };

  zonamil : string = ""
  desarrollofilter : string = ""


  constructor(private apipropsservice : ApipropsService,
     private router : Router, private apiAuth: ApiAuthService,
     private featureservice : FeatureserviceService, private apifiles : ApiFIlesService){

  }


  medidasBehav(){
    this.medidas = !this.medidas
    console.log(this.medidas)
  }

  obtainportada(Id :number ){
     let elemento = this.portadas.find(Element => Element.id===Id)
     return elemento?.src
  }


  show(prop : string){
    console.log(prop)
  }

  ngOnInit(): void {
    

    this.apifiles.getportadas().subscribe(res =>{

      if(res.exito===1){
       
        this.portadas = res.data
      }

    })
    


    this.apipropsservice.getProps3().subscribe(res =>{

      if(res.exito===1){
        this.propiedades = res.data;

      
        this.propiedades.forEach(element=> {
          if(this.zonas2.has(element.zona)){
            this.zonas2.set(element.zona, this.zonas2.get(element.zona)+1)
          }else{
            this.zonas2.set(element.zona, 1)
          }
          if(element.zona !==null){
            this.zonas.add(element.zona)
          
          }
          
          
        });
        console.log(this.zonas)
        this.zonasArray = Array.from(this.zonas) as string []
        //console.log(this.zonas)
      }

    })


    this.usuar$ = this.apiAuth.getUsuar$();
    this.usuar$.subscribe( usuar$ => this.usuario = usuar$ );





  }

  
  editarcomp(id: number){
    
    this.featureservice.updatefeature(id);
    this.router.navigate(['edit'])
  }


  verprop(id: number){
    
    this.featureservice.updatefeature(id);
    this.router.navigate(['ver'])
  }

  showText(){
    this.isReadMore = !this.isReadMore
  }



}
