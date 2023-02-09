import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarteComponent } from './carte/carte.component';
import { VillesComponent } from './villes/villes.component';
import { VilleDetailComponent } from './ville-detail/ville-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/carte', pathMatch: 'full' },
  { path: 'carte', component: CarteComponent },
  { path: 'detail/:id', component: VilleDetailComponent },
  { path: 'villes', component: VillesComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
