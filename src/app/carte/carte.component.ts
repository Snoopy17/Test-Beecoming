import { Component, AfterViewInit } from '@angular/core';

import { Ville } from '../ville';
import { VilleService } from '../ville.service';

import * as L from 'leaflet';

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.css'],
})
export class CarteComponent implements AfterViewInit {
  ville: Ville | undefined;

  constructor(private villeService: VilleService) {}

  ngAfterViewInit() {
    // Créer l'objet "macarte" et l'insèrer dans l'élément HTML qui a l'ID "lamap"
    const macarte = L.map('lamap').setView([48.852969, 2.349903], 6);

    // Leaflet ne récupère pas les cartes (tiles) sur un serveur par défaut.
    // Nous devons lui préciser où nous souhaitons les récupérer. Ici, openstreetmap.fr
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Beecoming Map',
      minZoom: 1,
      maxZoom: 20,
    }).addTo(macarte);

    // Déclaration de l'icon pour les marqueurs.
    const BlueMarker = L.icon({
      iconUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png',
    });

    // Déclaration des marqueurs sur la carte.
    // L.marker([villes[ville].lat, villes[ville].lon]).addTo(macarte);
    L.marker([48.85355570854074, 2.3482217137957093], { icon: BlueMarker })
      .bindPopup('Paris : 2 145 906 hab.')
      .addTo(macarte);
    L.marker([50.846025822626416, 4.35154747427336], { icon: BlueMarker })
      .bindPopup('Bruxelles : 1 191 604 hab.')
      .addTo(macarte);
    L.marker([49.61127566008429, 6.129797981674329], { icon: BlueMarker })
      .bindPopup('Luxembourg : 640 064 hab.')
      .addTo(macarte);
    L.marker([52.51709542108887, 13.388759847786957], { icon: BlueMarker })
      .bindPopup('Berlin : 3 748 148 hab.')
      .addTo(macarte);
    L.marker([46.94827292870929, 7.451452025438897], { icon: BlueMarker })
      .bindPopup('Berne : 133 115 hab.')
      .addTo(macarte);
  }
}
