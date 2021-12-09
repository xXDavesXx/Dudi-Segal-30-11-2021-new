import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {Store} from "@ngrx/store";
import {WeatherModelsModel} from "../Models/weatherModels.model";
import {selectFavorites} from "../store-favorite/favorites.selectors";

@Component({
  selector: 'app-favorite-weather-locations',
  templateUrl: './favorite-weather-locations.component.html',
  styleUrls: ['./favorite-weather-locations.component.scss']
})
export class FavoriteWeatherLocationsComponent implements OnChanges{

  @Input() dayNightMode: string;
  @Output() favoriteCity = new EventEmitter<string>();

  mode: string = 'day';

  favoriteCities$ = this.store.select(selectFavorites);

  constructor(private store: Store) { }

  ngOnChanges(changes: SimpleChanges) {
    const dayNightMode: SimpleChange = changes['dayNightMode']

    if (dayNightMode && dayNightMode.currentValue) {
      this.mode = dayNightMode.currentValue;
    }
  }

  returnAndDisplayFavorite(cityName: string): void {
    this.favoriteCity.emit(cityName);
  }

}
