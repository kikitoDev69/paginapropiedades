import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { propiedadesDB } from 'src/app/models/propiedadesDB';
import { ApipropsService } from 'src/app/services/apiprops.service';
import { FeatureserviceService } from 'src/app/services/featureservice.service';
import { ApiPropsComponent } from '../../api-props/api-props.component';

@Component({
  selector: 'app-addprop',
  templateUrl: './addprop.component.html',
  styleUrls: ['./addprop.component.css']
})
export class AddpropComponent implements OnInit {

  public loginForm = this.formBuilder.group({
    Id: [0],
    Desarrollo : ['', Validators.required] ,
    Desarrollador: ['', Validators.required],
    Zona: ['', Validators.required],
    PrecioMin: [0, Validators.required],
    PrecioMax: [0],
    Tipo: ['', Validators.required],
    Apartado: [0],
    Enganche: [''],
    FormasDePago: [''],
    Meses: [0],
    Financiamiento: [''],
    Mantenimiento: [''],
    Entrega: [new DatePipe(""), Validators.nullValidator],
    Disponibilidad: [0],
    Lat: ['', Validators.required],
    Lon: ['', Validators.required],
    Descripcion: [''],
    MedidasMin:[0],
    MedidasMax: [0]
 
  })


  constructor(private apiprop: ApipropsService, private snackbar : MatSnackBar, private featureservice : FeatureserviceService ,
    private router : Router , private formBuilder : FormBuilder){}

  //el bjeto que vamos a mandar
  nuevopropiedadDB : propiedadesDB ={
    Id: 0,
    Desarrollo: '',
    Desarrollador: '',
    Zona: '',
    PrecioMin: 0,
    PrecioMax: 0,
    Tipo: '',
    Apartado: 0,
    Enganche: '',
    FormasDePago: '',
    Meses: 0,
    Financiamiento: '',
    Mantenimiento: '',
    Entrega: new DatePipe(""),
    Disponibilidad: 0,
    Lat: '',
    Lon: '',
    Descripcion: '',
    MedidasMin: 0,
    MedidasMax: 0
  };

  propiedadSend : Object = new Object();
  // los formcontrol que necesita algunas entidades de mat angular (sin restricciones)
  date: FormControl =  new FormControl( '');
  descrip : FormControl = new FormControl(''); 



  

  feature$ !: Observable<number>;

  idfeature !: number;


ngOnInit()
{
  this.getData();

  
}
  
ver(){
 // console.log(this.date)
  if(this.date.value===""){
    this.nuevopropiedadDB.Entrega = null
  }
 
  
 // var propiedades : string [] = [];

  // for (var property in this.nuevopropiedadDB) {
  //   if(this.nuevopropiedadDB[property  as keyof typeof this.nuevopropiedadDB] === 0 || this.nuevopropiedadDB[property as keyof typeof this.nuevopropiedadDB]===""){
  //    propiedades.push(property)
  //     this.nuevopropiedadDB[property as keyof typeof this.nuevopropiedadDB]= null
  //     console.log(`${property}: ${this.nuevopropiedadDB[property as keyof typeof this.nuevopropiedadDB]}`);
  //   }
  // }
  // var myObj = new Object();
  // for (var property in this.nuevopropiedadDB) {
  //   if(this.nuevopropiedadDB[property  as keyof typeof this.nuevopropiedadDB] === 0 || this.nuevopropiedadDB[property as keyof typeof this.nuevopropiedadDB]===""){
  //    // propiedades.push(property)
  //     //this.nuevopropiedadDB[property as keyof typeof this.nuevopropiedadDB]= null
  //     console.log(`${property}: ${this.nuevopropiedadDB[property as keyof typeof this.nuevopropiedadDB]}`);
  //   }else{
  //   //  myObj[''+property] = this.nuevopropiedadDB[property as keyof typeof this.nuevopropiedadDB];
  //   }
  // }

  if (  this.loginForm.value!== undefined){
  
this.loginForm.value['Descripcion'] = this.descrip.value

this.loginForm.value['Entrega'] = this.date.value


this.enviarData(this.loginForm.value)
//console.log(this.loginForm.value)
  } 
}

 enviarData(nuevopropiedadDB : any){

  this.apiprop.addProp(nuevopropiedadDB).subscribe( response =>{
    if(response.exito===1){

      
     this.featureservice.updatefeature(response.data)
      this.snackbar.open("Propiedad creada con éxito", '',{
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

      this.router.navigate(['edit']);
    }else{
      this.snackbar.open("Error al crear propiedad", '',{
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    }
  })


 }


 setData() {
  this.loginForm.value['Descripcion'] = this.descrip.value
  this.loginForm.value['Entrega'] = this.date.value
  localStorage.setItem('nuevaPropiedad', JSON.stringify(this.loginForm.value));
}

setDataNull() {
  localStorage.removeItem('nuevaPropiedad');
  
  this.loginForm.setValue({
    Id: 0,
    Desarrollo: '',
    Desarrollador: '',
    Zona: '',
    PrecioMin: 0,
    PrecioMax: 0,
    Tipo: '',
    Apartado: 0,
    Enganche: '',
    FormasDePago: '',
    Meses: 0,
    Financiamiento: '',
    Mantenimiento: '',
    Entrega: new DatePipe(""),
    Disponibilidad: 0,
    Lat: '',
    Lon: '',
    Descripcion: '',
    MedidasMin: 0,
    MedidasMax: 0
  });
  this.descrip.setValue("")
  this.date.setValue("")

}



getData() {

  var data = JSON.parse(localStorage.getItem('nuevaPropiedad')!);
  if(data){

    this.loginForm.setValue(data);
   // this.nuevopropiedadDB = data
    this.descrip.setValue( this.loginForm.value['Descripcion']);
    this.date.setValue(this.loginForm.value['Entrega'])

  }
}


}






