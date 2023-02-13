import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubirarchivosComponent } from './components/subirarchivos/subirarchivos.component';
import { LoginComponent } from './components/login/login.component';
import { MapaComponent } from './mapa/mapa.component';
import { EditarpropComponent } from './components/editarprop/editarprop.component';
import { AddpropComponent } from './components/propactions/addprop/addprop.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [

 { path: 'mapa', component: MapaComponent},
  {path: '' , redirectTo: '/mapa', pathMatch:'full'},
  {path: "login", component: LoginComponent},
  {path: "uploadfiles", component: SubirarchivosComponent, canActivate: [AuthGuard]},
  {path: "edit", component: EditarpropComponent, canActivate: [AuthGuard]},
  {path: "add", component: AddpropComponent, canActivate: [AuthGuard]}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
