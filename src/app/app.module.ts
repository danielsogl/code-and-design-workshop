import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Hier werden für deutsche User verwendete Formatierungen geladen
registerLocaleData(localeDe, 'de-DE');

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    // Hier wird der Text für den unter iOS dargestellten "Back-Button" gesetzt
    IonicModule.forRoot({ backButtonText: 'Zurück' }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Hier werden die zuvor geladenen deutschen Formate registriert um in der App
    // genutzt zu werden
    { provide: LOCALE_ID, useValue: 'de-DE' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
