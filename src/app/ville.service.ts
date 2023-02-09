import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Ville } from './ville';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class VilleService {
  private villesUrl = 'api/villes'; // URL vers l'API Web

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** OBTENIR les villes du serveur */
  getVilles(): Observable<Ville[]> {
    return this.http.get<Ville[]>(this.villesUrl).pipe(
      tap((_) => this.log('Bascule Carte/Liste effectuée')),
      catchError(this.handleError<Ville[]>('getVilles', []))
    );
  }

  /** OBTENIR la ville par identifiant. Renvoie `undefined` lorsque l'identifiant est introuvable */
  getVilleNo404<Data>(id: number): Observable<Ville> {
    const url = `${this.villesUrl}/?id=${id}`;
    return this.http.get<Ville[]>(url).pipe(
      map((villes) => villes[0]), // renvoie un tableau d'éléments {0|1}
      tap((h) => {
        const outcome = h ? 'récupéré' : 'pas trouvé';
        this.log(`${outcome} ville id=${id}`);
      }),
      catchError(this.handleError<Ville>(`getVille id=${id}`))
    );
  }

  /** OBTENIR la ville par identifiant. Sera 404 si l'identifiant n'est pas trouvé */
  getVille(id: number): Observable<Ville> {
    const url = `${this.villesUrl}/${id}`;
    return this.http.get<Ville>(url).pipe(
      tap((_) => this.log(`Ville id=${id} récupérée`)),
      catchError(this.handleError<Ville>(`getVille id=${id}`))
    );
  }

  /* OBTENIR les villes dont le nom contient le terme de recherche */
  searchVilles(term: string): Observable<Ville[]> {
    if (!term.trim()) {
      // s'il ne s'agit pas d'un terme de recherche, renvoie un tableau de villes vide.
      return of([]);
    }
    return this.http.get<Ville[]>(`${this.villesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`Villes trouvées correspondant "${term}"`)
          : this.log(`Aucune ville correspondante "${term}"`)
      ),
      catchError(this.handleError<Ville[]>('searchVilles', []))
    );
  }

  //////// Enregistrer les méthodes //////////

  /** POST : ajouter une nouvelle ville au serveur */
  addVille(ville: Ville): Observable<Ville> {
    return this.http.post<Ville>(this.villesUrl, ville, this.httpOptions).pipe(
      tap((newVille: Ville) => this.log(`Ville id=${newVille.id} ajoutée`)),
      catchError(this.handleError<Ville>('addVille'))
    );
  }

  /** DELETE : supprimer la ville du serveur */
  deleteVille(id: number): Observable<Ville> {
    const url = `${this.villesUrl}/${id}`;

    return this.http.delete<Ville>(url, this.httpOptions).pipe(
      tap((_) => this.log(`Ville id=${id} effacée `)),
      catchError(this.handleError<Ville>('deleteVille'))
    );
  }

  /** PUT : mettre à jour la ville sur le serveur */
  updateVille(ville: Ville): Observable<any> {
    return this.http.put(this.villesUrl, ville, this.httpOptions).pipe(
      tap((_) => this.log(`Ville id=${ville.id} mise à jour`)),
      catchError(this.handleError<any>('updateVille'))
    );
  }

  /**
   * Gérer l'opération Http qui a échoué.
   * Laissez l'application continuer.
   *
   * @param operation - nom de l'opération qui a échoué
   * @param result - valeur facultative à renvoyer comme résultat observable
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO : envoyer l'erreur à l'infrastructure de journalisation à distance
      console.error(error); // se connecte à la console à la place

      // TODO : meilleur travail de transformation de l'erreur pour la consommation de l'utilisateur
      this.log(`${operation} échoué : ${error.message}`);

      // Laisse l'application continuer à fonctionner en renvoyant un résultat vide.
      return of(result as T);
    };
  }

  /** Enregistrer un message VilleService avec MessageService */
  private log(message: string) {
    this.messageService.add(`Message Service : ${message}`);
  }
}
