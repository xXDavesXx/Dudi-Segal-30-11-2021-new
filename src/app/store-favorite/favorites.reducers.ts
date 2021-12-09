import { createReducer, on } from '@ngrx/store';

import {
  addToFavorite,
  removeFromFavorite,
  changeWeatherUnits
} from './favorites.actions';
import {WeatherModelsModel} from "../Models/weatherModels.model";

export const initialState: ReadonlyArray<WeatherModelsModel> = [];

export const favoritesReducer = createReducer(
  initialState,
  on(addToFavorite, (state, { weatherEntity }) => {
    const index = state.findIndex(x => x.cityName === weatherEntity.cityName);
    if (index > -1) return state;
    return [...state, weatherEntity];
  }),
  on(removeFromFavorite, (state, { cityName }) => {
    const stateArray = [...state];
    const index = state.findIndex(x => x.cityName === cityName);
    if (index > -1) {
      stateArray.splice(index,1);
      return [...stateArray];
    } else {
      return [...state];
    }
  }),
  on(changeWeatherUnits, (state) => {
    if (state.length > 0) {
      const stateArray: WeatherModelsModel[] = Convertor.returnStateWithDataChange( [...state]);
      return stateArray
    } else {
      return state;
    }
  }),
);

export class Convertor {

  static convertUnits(currentUnits: string, currentTemp: number): number {
    if (currentUnits === 'F') {
      return +((currentTemp - 32) * .5556).toFixed(1);
    } else {
      return +((currentTemp * 1.8) + 32).toFixed(1)
    }
  }

  static convertUnitsName(currentUnits: string): string {
    if (currentUnits === 'F') {
      return 'C';
    } else {
      return 'F'
    }
  }

  static returnStateWithDataChange(forecast: WeatherModelsModel[]): WeatherModelsModel[] {
    const stateArray: WeatherModelsModel[] = forecast.map( (data: WeatherModelsModel) => {
      return {
        cityName: data.cityName,
        days: Array.from(Object.values(data.days)).map((day) => {
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
    })
    return stateArray;
  }

}

