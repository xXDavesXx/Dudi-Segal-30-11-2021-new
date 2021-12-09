import {Component, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {OneDay} from "../../Models/weatherModels.model";

@Component({
  selector: 'app-favorite-city-box',
  templateUrl: './favorite-city-box.component.html',
  styleUrls: ['./favorite-city-box.component.scss']
})
export class FavoriteCityBoxComponent implements OnChanges {

  @Input() cityName: string;
  @Input() dayNightMode: string;
  @Input() favoriteCitiesDayData: OneDay;

  favoriteCity: OneDay;
  mode: string = 'day';

  ngOnChanges(changes: SimpleChanges) {
    const favoriteCitiesDayData: SimpleChange = changes['favoriteCitiesDayData'];
    const dayNightMode: SimpleChange = changes['dayNightMode'];

    if ( favoriteCitiesDayData && favoriteCitiesDayData.currentValue ) {
      this.favoriteCity = {...favoriteCitiesDayData.currentValue};
    }
    if ( dayNightMode && dayNightMode.currentValue ) {
      this.mode = dayNightMode.currentValue;
    }
  }
}
