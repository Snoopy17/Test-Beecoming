import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Ville } from '../ville';
import { VilleService } from '../ville.service';

@Component({
  selector: 'app-ville-search',
  templateUrl: './ville-search.component.html',
  styleUrls: ['./ville-search.component.css'],
})
export class VilleSearchComponent implements OnInit {
  villes$!: Observable<Ville[]>;
  private searchTerms = new Subject<string>();

  constructor(private villeService: VilleService) {}

  // Poussez un terme de recherche dans le flux observable.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.villes$ = this.searchTerms.pipe(
      // Attendre 300 ms après chaque frappe avant de considérer le terme
      debounceTime(300),

      // Ignorer le nouveau terme s'il est identique au terme précédent
      distinctUntilChanged(),

      // Passer à une nouvelle recherche observable à chaque fois que le terme change
      switchMap((term: string) => this.villeService.searchVilles(term))
    );
  }
}
