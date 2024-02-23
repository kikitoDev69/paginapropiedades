import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubirarchivosComponent } from './components/subirarchivos/subirarchivos.component';
import { LoginComponent } from './components/login/login.component';
import { MapaComponent } from './mapa/mapa.component';
import { EditarpropComponent } from './components/editarprop/editarprop.component';
import { AddpropComponent } from './components/propactions/addprop/addprop.component';
import { AuthGuard } from './security/auth.guard';
import { PropscardComponent } from './components/propscard/propscard.component';
import { VerpropComponent } from './components/propactions/verprop/verprop.component';
import { EdituserComponent } from './components/user/edituser/edituser.component';

const routes: Routes = [

 { path: 'mapa', component: MapaComponent},
  {path: '' , redirectTo: '/mapa', pathMatch:'full'},
  {path: "login", component: LoginComponent},
  {path: "cards", component: PropscardComponent},
  {path: "uploadfiles", component: SubirarchivosComponent, canActivate: [AuthGuard]},
  {path: "edit", component: EditarpropComponent, canActivate: [AuthGuard]},
  {path: "add", component: AddpropComponent, canActivate: [AuthGuard]},
  {path: "editUser", component: EdituserComponent, canActivate: [AuthGuard]},
  {path: "ver", component: VerpropComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
