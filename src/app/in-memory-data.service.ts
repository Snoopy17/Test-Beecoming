import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Ville } from './ville';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const villes = [
      {
        id: 1,
        name: 'Paris',
        habit: '2 145 906',
        pays: 'France',
        latit: '48.85355570854074',
        longit: '2.3482217137957093',
        altit: '46',
      },
      {
        id: 2,
        name: 'Bruxelles',
        habit: '1 191 604',
        pays: 'Belgique',
        latit: '50.846025822626416',
        longit: '4.35154747427336',
        altit: '28',
      },
      {
        id: 3,
        name: 'Luxembourg',
        habit: '640 064',
        pays: 'Luxembourg',
        latit: '49.61127566008429',
        longit: '6.129797981674329',
        altit: '289',
      },
      {
        id: 4,
        name: 'Berlin',
        habit: '3 748 148',
        pays: 'Allemagne',
        latit: '52.51709542108887',
        longit: '13.388759847786957',
        altit: '40',
      },
      {
        id: 5,
        name: 'Berne',
        habit: '133 115',
        pays: 'Suisse',
        latit: '46.94827292870929',
        longit: '7.451452025438897',
        altit: '557',
      },
    ];
    return { villes };
  }

  // Remplace la méthode genId pour s'assurer qu'une ville a toujours un identifiant.
  // Si le tableau des villes est vide,
  // la méthode ci-dessous renvoie le nombre initial (11).
  // si le tableau des villes n'est pas vide, la méthode ci-dessous renvoie le plus élevé
  // identifiant de la ville + 1.
  genId(villes: Ville[]): number {
    return villes.length > 0
      ? Math.max(...villes.map((ville) => ville.id)) + 1
      : 11;
  }
}
