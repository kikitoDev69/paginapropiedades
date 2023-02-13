import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { propiedadesDB } from 'src/app/models/propiedadesDB';
import { ApipropsService } from 'src/app/services/apiprops.service';
import { ApiPropsComponent } from '../../api-props/api-props.component';

@Component({
  selector: 'app-addprop',
  templateUrl: './addprop.component.html',
  styleUrls: ['./addprop.component.css']
})
export class AddpropComponent implements OnInit {


  constructor(private apiprop: ApipropsService, private snackbar : MatSnackBar){}

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

ngOnInit()
{
  this.getData();
}
  
ver(){
  console.log(this.date)
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


  console.log(this.nuevopropiedadDB)
this.enviarData(this.nuevopropiedadDB)
 }

 enviarData(nuevopropiedadDB : propiedadesDB){

  this.apiprop.addProp(nuevopropiedadDB).subscribe( response =>{
    if(response.exito===1){

      this.snackbar.open("Propiedad creada con éxito", '',{
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });

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
  this.nuevopropiedadDB.Entrega = this.date.value
  this.nuevopropiedadDB.Descripcion = this.descrip.value
  localStorage.setItem('nuevaPropiedad', JSON.stringify(this.nuevopropiedadDB));
}


getData() {

  var data = JSON.parse(localStorage.getItem('nuevaPropiedad')!);
  if(data){
    this.nuevopropiedadDB = data
    this.descrip.setValue(this.nuevopropiedadDB.Descripcion!);
    this.date.setValue(this.nuevopropiedadDB.Entrega)

  }
}


}






