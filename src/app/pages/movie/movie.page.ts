import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Movie } from '../../models/movie.model';
import { TMDBService } from '../../services/tmdb/tmdb.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss']
})
export class MoviePage implements OnInit {
  // Hier wird der Film gespeichert
  public movie: Movie;
  // Dieser Wert gibt an ob die App gerade Daten vom Server läd
  public isLoading = false;

  /**
   * Diese Methode initialisiert unsere Seite nach dem Öffnen
   * @param tmdbService Unser TMDB Service um die Film-Details zu laden
   * @param route Hiermit kann man auf die URL des Browsers zugreifen
   */
  constructor(private tmdbService: TMDBService, private route: ActivatedRoute) {}

  // Diese Funktion kannst du ignorieren
  ngOnInit() {}

  /**
   * Diese Funktion wird automatisch aufgerufen sobald die Seite geöffnet wurde.
   * Weitere Event-Funktionen findest du in der Ionic-Dokumentation
   * @see https://ionicframework.com/docs/angular/lifecycle
   */
  ionViewDidEnter() {
    // Alle Parameter werden in einer Variable zwischengespeichert
    const map = this.route.snapshot.paramMap;

    // Prüfe ob es überhaupt eine ID gibt und es sich um eine Zahl handelt
    // Das "+" wandelt automatisch einen Text in eine Zahl um
    if (+map.get('id')) {
      const id = +map.get('id');
      // Falls es sich um eine gültige ID handelt wird der Film geladen

      // Zeige den Lade-Spinner
      this.isLoading = true;

      this.tmdbService
        .getMovie(id)
        .then(result => {
          this.movie = result;
          // Verstecke den Lade-Spinner wieder
          this.isLoading = false;
        })
        .catch(() => {})
        // Im Fehlerfall wegen z.B. einer fehlenden Internetverbindung
        // wird automatisch diese Funktion aufgerufen
        .catch(() => {
          // Falls etwas schieflaufen sollte ebenfalls den Lade-Spinner entfernen
          this.isLoading = false;
        });
    }
  }
}
