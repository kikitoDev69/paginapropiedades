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
import { HttpClientModule } from '@angular/common/http';
import { ApiPropsComponent } from './components/api-props/api-props.component';

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    ScalelineComponent,
    SwitchlayerComponent,
    PopupComponent,
    ApiPropsComponent
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
