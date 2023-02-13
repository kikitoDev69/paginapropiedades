import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapaComponent } from './mapa/mapa.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav'
import{ MatDialogModule} from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatTableModule} from '@angular/material/table'
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { MatCardModule} from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { MatExpansionModule } from '@angular/material/expansion';
import { ScalelineComponent } from './components/scaleline/scaleline.component';
import { SwitchlayerComponent } from './components/switchlayer/switchlayer.component';
import { PopupComponent } from './components/popup/popup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPropsComponent } from './components/api-props/api-props.component';

import { FilterpropsComponent } from './components/filterprops/filterprops.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { registerLocaleData } from '@angular/common';
import localeES from "@angular/common/locales/es";
import { LoginComponent } from './components/login/login.component';
import { SubirarchivosComponent } from './components/subirarchivos/subirarchivos.component';
import { DialogloginComponent } from './components/login/dialoglogin/dialoglogin.component';
import { DialogwarninglogoutComponent } from './components/login/dialogwarninglogout/dialogwarninglogout.component';
import { DialogwarningloginComponent } from './components/common/dialogwarninglogin/dialogwarninglogin.component';
import { JwtInterceptor } from './security/jwt.interceptor';
import { EditarpropComponent } from './components/editarprop/editarprop.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import { AddpropComponent } from './components/propactions/addprop/addprop.component';
import { DialogwarningdeleteComponent } from './components/editarprop/dialogwarningdelete/dialogwarningdelete.component';
import { DialogwarnigneditComponent } from './components/editarprop/dialogwarnignedit/dialogwarnignedit.component';

registerLocaleData(localeES, "es");

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    ScalelineComponent,
    SwitchlayerComponent,
    PopupComponent,
    ApiPropsComponent,
    FilterpropsComponent,
    LoginComponent,
    SubirarchivosComponent,
    DialogloginComponent,
    DialogwarninglogoutComponent,
    DialogwarningloginComponent,
    EditarpropComponent,
    AddpropComponent,
    DialogwarningdeleteComponent,
    DialogwarnigneditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSnackBarModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatExpansionModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PdfViewerModule,
    MatGridListModule,
    MatMenuModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
