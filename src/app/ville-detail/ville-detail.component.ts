import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Ville } from '../ville';
import { VilleService } from '../ville.service';

@Component({
  selector: 'app-ville-detail',
  templateUrl: './ville-detail.component.html',
  styleUrls: ['./ville-detail.component.css'],
})
export class VilleDetailComponent implements OnInit {
  ville: Ville | undefined;

  constructor(
    private route: ActivatedRoute,
    private villeService: VilleService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getVille();
  }

  getVille(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.villeService.getVille(id).subscribe((ville) => (this.ville = ville));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.ville) {
      this.villeService.updateVille(this.ville).subscribe(() => this.goBack());
    }
  }
}
