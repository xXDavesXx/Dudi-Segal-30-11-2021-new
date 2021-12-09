import {Component, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {OneDay, WeatherModelsModel} from "../../Models/weatherModels.model";

@Component({
  selector: 'app-daily-weather-box',
  templateUrl: './daily-weather-box.component.html',
  styleUrls: ['./daily-weather-box.component.scss']
})
export class DailyWeatherBoxComponent implements OnChanges{

  @Input() forecast: OneDay;
  @Input() dayNightMode: String;

  oneDayDisplay: OneDay;
  mode: string = 'day';

  ngOnChanges(changes: SimpleChanges) {
    const forecast: SimpleChange = changes['forecast'];
    const dayNightMode: SimpleChange = changes['dayNightMode'];

    if(forecast && forecast.currentValue) {
      this.oneDayDisplay = {...forecast.currentValue};
    }
    if(dayNightMode && dayNightMode.currentValue) {
      this.mode = dayNightMode.currentValue;
    }
  }

}
