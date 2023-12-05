import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VecteurComponent } from './vecteur/vecteur.component';
import { MatriceComponent } from './matrice/matrice.component';
import { MatButtonModule, MatDividerModule, MatIconModule, MatSlideToggleModule } from '@angular/material';

import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { ResolutionComponent } from './resolution/resolution.component';

@NgModule({
  
  declarations: [
    AppComponent,
    VecteurComponent,
    MatriceComponent,
    HomeComponent,
    ResolutionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
