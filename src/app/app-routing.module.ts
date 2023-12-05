import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VecteurComponent } from './vecteur/vecteur.component';
import { AppComponent } from './app.component';
import { MatriceComponent } from './matrice/matrice.component';
import { HomeComponent } from './home/home.component';
import { ResolutionComponent } from './resolution/resolution.component';

const routes: Routes = [
  {path: "vecteur",component:VecteurComponent},
  {path: "matrice",component:MatriceComponent},
  {path: "resolution",component:ResolutionComponent},
  {path: "",component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
