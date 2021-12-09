import {Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {OneDay, WeatherModelsModel} from "../Models/weatherModels.model";

@Component({
  selector: 'app-week-forecast',
  templateUrl: './week-forecast.component.html',
  styleUrls: ['./week-forecast.component.scss']
})
export class WeekForecastComponent implements OnChanges{

  @Input() forecastData: WeatherModelsModel;
  @Input() dayNightMode: string;

  newForeCastData: OneDay[];
  mode: string = 'day';

  ngOnChanges(changes: SimpleChanges) {
    const weekForecast: SimpleChange =  changes['forecastData'];
    const dayNightMode: SimpleChange =  changes['dayNightMode'];

    if(weekForecast && weekForecast.currentValue) {
      this.newForeCastData = Array.from(Object.values(weekForecast.currentValue.days));
    }
    if(dayNightMode && dayNightMode.currentValue) {
      this.mode = dayNightMode.currentValue;
    }
  }

  changeDateFormat(date: string): string {
    const entireDate: string[] = date.split('T');
    return entireDate[0];
  }



}
