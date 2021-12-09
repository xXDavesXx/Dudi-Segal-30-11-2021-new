import {Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Store} from "@ngrx/store";
import {
  addToFavorite,
  removeFromFavorite,
} from "../store-favorite/favorites.actions";
import {OneDay, WeatherModelsModel} from "../Models/weatherModels.model";
import {HttpClient} from "@angular/common/http";
import {Convertor} from "../store-favorite/favorites.reducers";

@Component({
  selector: 'app-main-weather-window',
  templateUrl: './main-weather-window.component.html',
  styleUrls: ['./main-weather-window.component.scss']
})
export class MainWeatherWindowComponent implements OnChanges{

  @Input() isMetric: boolean;
  @Input() favoriteCity: string;
  @Input() favoriteListReq: boolean;
  @Input() dayNightMode: string;


  cityOnDisplay: string = '';
  isAddFavorite = 'Add To';
  isSelectedCityFavorite: boolean;
  forecastData: WeatherModelsModel ;
  mode: string = 'day';

  private key: string = '31xq0BY7H34nMY2cstoUbnFdSyfQKzmd';
  private initialAddressForGeoLocation: string = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  private initialAddressForForecast: string = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';

  constructor(private store: Store, private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges) {
    const favoriteCity = changes['favoriteCity'];
    const isMetric = changes['isMetric'];
    const dayNightMode = changes['dayNightMode'];

    if (favoriteCity && favoriteCity.currentValue) {
      this.getForecastInformation(favoriteCity.currentValue);
    }
    if (isMetric) {
      if (!this.forecastData) return;
      this.forecastData = {
        cityName: this.cityOnDisplay,
        days: Array.from(Object.values(this.forecastData.days)).map((day) => {
          return {
            dayData: {
              icon: day.dayData.icon,
              iconPhrase: day.dayData.iconPhrase,
              temperature: {
                temperatureValue: Convertor.convertUnits(day.dayData.temperature.units, day.dayData.temperature.temperatureValue),
                units: Convertor.convertUnitsName(day.dayData.temperature.units),
              }
            },
            nightData: {
              icon: day.nightData.icon,
              iconPhrase: day.nightData.iconPhrase,
              temperature: {
                temperatureValue:Convertor.convertUnits(day.nightData.temperature.units, day.nightData.temperature.temperatureValue),
                units: Convertor.convertUnitsName(day.nightData.temperature.units),
              }
            },
            date: day.date,
          }
        })
      }
    }
    if(dayNightMode && dayNightMode.currentValue) {
      this.mode = dayNightMode.currentValue;
    }
  }

  getForecastInformation(cityName: string): void {
    this.cityOnDisplay = cityName;
    this.getCityForecastInformation(cityName, this.isMetric);
  }

  getCityListFromStore(): WeatherModelsModel[] {
    let storeFavoriteCityList:any = [];
    this.store.forEach(favorite => storeFavoriteCityList.push(favorite));
    return storeFavoriteCityList[0].favorites;
  }

  changeFavoriteStatus(): void {
    const cityName = this.cityOnDisplay;
    const weatherEntity = this.forecastData;
    if (this.isSelectedCityFavorite) {
      this.store.dispatch(removeFromFavorite({ cityName }));
      this.isSelectedCityFavorite = false;
      this.isAddFavorite = 'Add To'
    } else {
      this.store.dispatch(addToFavorite({ weatherEntity }));
      this.isSelectedCityFavorite = true;
      this.isAddFavorite = 'Remove From'
    }
  }



     ////////////////////////////////////////
    /////// fetch data from website ////////
   ////////////////////////////////////////

  getCityForecastInformation(cityName: string, isMetric: boolean): void {
    const nameToSend = this.changeNameToSendFormat(cityName);
    this.http.get(
      this.initialAddressForGeoLocation + `?apikey=${this.key}&q=${nameToSend}`)
      .subscribe(
        data => {
          this.requestServerCityForecastInfo(data, isMetric);
        },
        //future possibility - replace it with default display
        error => console.log(error)
      );
  }

  changeNameToSendFormat(cityName: string): string {
    const splitName: string[] = cityName.split(/,|-| /)
    if(splitName.length > 1) {
      return `${splitName[0]}%20${splitName[1]}`
    } else {
      return cityName;
    }
  }

  requestServerCityForecastInfo(locationInfo: any, isMetric: boolean): void {
    const cityKey = this.getCityKeyFromData(locationInfo);
    if(cityKey !== '') {
      this.http.get(
        this.initialAddressForForecast + `${cityKey}?apikey=${this.key}&metric=${isMetric}`)
        .subscribe(
          data => {
            this.convertJsonToModel(data);
          },
          //future possibility - replace it with default display
          error => console.log(error)
        );
    }
  }

  //TODO: improve the search to choose a specific city
  private getCityKeyFromData(locationInfo: any): string {
    if (locationInfo[0]) {
      return locationInfo[0].Key;
    } else {
      return '';
    }
  }

  private convertJsonToModel(data: any): void {
    const allDays: OneDay[] = [];
    if(data) {
      data.DailyForecasts.forEach( (forecast: any) => {
        allDays.push(
          {
            dayData: {
              icon: forecast.Day.Icon,
              iconPhrase: forecast.Day.IconPhrase,
              temperature: {
                temperatureValue: forecast.Temperature.Maximum.Value,
                units: forecast.Temperature.Maximum.Unit
              }
            },
            nightData: {
              icon: forecast.Night.Icon,
              iconPhrase: forecast.Night.IconPhrase,
              temperature: {
                temperatureValue: forecast.Temperature.Minimum.Value,
                units: forecast.Temperature.Minimum.Unit
              }
            },
            date: this.changeDateFormat(forecast.Date),
          });
      });
    }
    const favoriteCities = this.getCityListFromStore();
    const index = favoriteCities.findIndex(x => x.cityName.toLowerCase() === this.cityOnDisplay.toLowerCase());
    if (index > -1) {
      this.isSelectedCityFavorite = true;
      this.isAddFavorite = 'Remove From'
    } else {
      this.isSelectedCityFavorite = false;
      this.isAddFavorite = 'Add To'
    }
    this.forecastData = {...{cityName: this.cityOnDisplay ,days: {...allDays}}};
  }

  changeDateFormat(date: string): string {
    const entireDate: string[] = date.split('T');
    return entireDate[0];
  }

}
