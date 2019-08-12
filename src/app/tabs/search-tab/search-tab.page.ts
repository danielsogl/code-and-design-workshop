import { Component, OnInit } from '@angular/core';

import { SearchMovie } from '../../models/search-result.model';
import { TMDBService } from '../../services/tmdb/tmdb.service';

@Component({
  selector: 'app-search-tab',
  templateUrl: './search-tab.page.html',
  styleUrls: ['./search-tab.page.scss']
})
export class SearchTabPage implements OnInit {
  // Hier wird der Text aus der Suchleiste gespeichert
  public query: string;
  // Hier sind die Ergebnisse der Suche gespeichert
  public movies: SearchMovie[] = [];
  // Dieser Wert gibt an ob die App gerade Daten vom Server läd
  public isLoading = false;

  /**
   * Diese Methode initialisiert unsere Seite nach dem Öffnen
   * @param tmdbService Unser TMDB Service um nach Filmen zu suchen
   */
  constructor(private tmdbService: TMDBService) {}

  // Diese Funktion kannst du ignorieren
  ngOnInit() {}

  search() {
    // Prüfe ob User einen Text eingegebene hat
    if (this.query.trim() !== '') {
      // Zeige den Lade-Spinner
      this.isLoading = true;

      // Rufe den Search-Service auf
      this.tmdbService
        .search(this.query)
        // Then kannst du wie im Deutschen als "dann" lesen
        .then(result => {
          // Speichere das Ergebnis in der movies Variable
          this.movies = result.results;
          // Verstecke den Lade-Spinner wieder
          this.isLoading = false;
        })
        // Im Fehlerfall wegen z.B. einer fehlenden Internetverbindung
        // wird automatisch diese Funktion aufgerufen
        .catch(() => {
          // Falls etwas schieflaufen sollte ebenfalls den Lade-Spinner entfernen
          this.isLoading = false;
        });
    } else {
      // Falls der User nichts eingegeben oder den Text gelöscht hat
      // wird das Array wieder geleert
      this.movies = [];
    }
  }
}
