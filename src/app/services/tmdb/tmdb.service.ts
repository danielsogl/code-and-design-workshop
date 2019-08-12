import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { SearchResult } from '../../models/search-result.model';

@Injectable({
  providedIn: 'root'
})
export class TMDBService {
  // Das ist Pfad der Schnittstelle mit denen alle Anfragen beginnen
  // Die Variable ist "privat" da nur der Service davon bescheid wissen muss
  private endpoint = 'https://api.themoviedb.org/3';

  /**
   *
   * @param http Hierrüber können wir mit einer REST-Schnittstelle kommunizieren
   */
  constructor(private http: HttpClient) {}

  /**
   * Diese Function gibt eine Liste von Filmen anhand
   * eines übergebenen Textes zurück.
   *
   * Die Dokumentation findest du hier
   * @see https://developers.themoviedb.org/3/search/search-movies
   */
  public search(query: string): Promise<SearchResult> {
    // Hier wird die URL anhand der Dokumentation zusammengebaut
    const url = `${this.endpoint}/search/movie`;

    // Anhand der Dokumentation fügen wir unseren Text der URL hinzu
    let params = new HttpParams();
    params = params.append('query', query);

    // Hier fügen wir unsere standard Parameter der URL hinzu
    params = this.getDefaultParams(params);

    // Hier wird die Anfrage ausgeführt und das Ergebnis
    // als Antwort zurückgegeben
    return this.http.get<SearchResult>(url, { params }).toPromise();
  }

  /**
   * Diese Methode erweitert die Parameter einer URL um den API-Key
   * und die Sprache mit der die Ergebnisse zurück kommen sollen.
   * Die Parameter für die Sprache können der Dokumentation entnommen werden
   * @see https://developers.themoviedb.org/3/getting-started/languages
   *
   * @param existingParams Falls vorhanden können hier Paramter übergeben werden
   */
  private getDefaultParams(existingParams?: HttpParams) {
    // Diese Prüfung verwendet falls übergeben die bereits erstellen Parameter
    // oder verwendet ein neues Parameter-Object
    let params = existingParams ? existingParams : new HttpParams();
    // Hier wird der API-Key gesetzt
    params = params.append('api_key', environment.apiKey);
    // Hier wird die Sprache gesetzt
    params = params.append('language', 'de');

    // return params
    return params;
  }
}
