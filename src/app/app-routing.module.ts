import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubirarchivosComponent } from './components/subirarchivos/subirarchivos.component';
import { LoginComponent } from './components/login/login.component';
import { MapaComponent } from './mapa/mapa.component';

const routes: Routes = [

 { path: 'mapa', component: MapaComponent},
  {path: '' , redirectTo: '/mapa', pathMatch:'full'},
  {path: "login", component: LoginComponent},
  {path: "uploadfiles", component: SubirarchivosComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
