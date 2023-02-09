import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CarteComponent } from './carte/carte.component';
import { VilleDetailComponent } from './ville-detail/ville-detail.component';
import { VillesComponent } from './villes/villes.component';
import { VilleSearchComponent } from './ville-search/ville-search.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // Le module HttpClientInMemoryWebApiModule intercepte les requêtes HTTP
    // et renvoie des réponses de serveur simulées.
    // Supprimez-le lorsqu'un serveur réel est prêt à recevoir des requêtes.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  declarations: [
    AppComponent,
    CarteComponent,
    VillesComponent,
    VilleDetailComponent,
    MessagesComponent,
    VilleSearchComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
