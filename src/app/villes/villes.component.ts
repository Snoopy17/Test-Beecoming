import { Component, OnInit } from '@angular/core';

import { Ville } from '../ville';
import { VilleService } from '../ville.service';

@Component({
  selector: 'app-villes',
  templateUrl: './villes.component.html',
  styleUrls: ['./villes.component.css'],
})
export class VillesComponent implements OnInit {
  villes: Ville[] = [];

  constructor(private villeService: VilleService) {}

  ngOnInit(): void {
    this.getVilles();
  }

  getVilles(): void {
    this.villeService.getVilles().subscribe((villes) => (this.villes = villes));
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.villeService.addVille({ name } as Ville).subscribe((ville) => {
      this.villes.push(ville);
    });
  }

  delete(ville: Ville): void {
    this.villes = this.villes.filter((h) => h !== ville);
    this.villeService.deleteVille(ville.id).subscribe();
  }
}
