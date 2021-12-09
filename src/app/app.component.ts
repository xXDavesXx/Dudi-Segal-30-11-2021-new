import { Component } from '@angular/core';
import {Store} from "@ngrx/store";
import {changeWeatherUnits} from "./store-favorite/favorites.actions";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  display: string = 'home';
  cityDisplayInMain: string = 'Tel Aviv';
  displayUnits: string = 'C';
  dayNightMode: string = 'day';
  isMetric: boolean = true;
  favoriteListReq: boolean;
  color: ThemePalette = 'accent';

  constructor(private store: Store) { }

  goToMainDisplayWithFavorite(cityName: string): void {
    this.display = 'home';
    this.cityDisplayInMain = cityName;
  }

  changeDisplayAndResendDataToFavorites(page: string): void {
    switch (page) {
      case 'favorite':
        this.display = 'favorite';
        this.favoriteListReq = !this.favoriteListReq;
        break;
      case 'home' :
        this.display = 'home';
        this.cityDisplayInMain = 'Tel Aviv';
        break;
    }
  }

  changeTemperatureUnits(): void {
    if(this.isMetric) {
      this.displayUnits = 'F';
      this.isMetric = false;
    } else {
      this.displayUnits = 'C';
      this.isMetric = true;
    }
    this.store.dispatch(changeWeatherUnits())
  }

  changeDayNightMode() {
    if (this.dayNightMode === 'day') {
      this.dayNightMode = 'night';
    } else {
      this.dayNightMode = 'day';
    }
  }

}
