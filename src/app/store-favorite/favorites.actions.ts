import { createAction, props } from '@ngrx/store';
import {WeatherModelsModel} from "../Models/weatherModels.model";

export const addToFavorite = createAction(
  '[Favorite List] Add City To Favorite',
  props<{ weatherEntity: WeatherModelsModel }>()
);

export const removeFromFavorite = createAction(
  '[Favorite List] Remove City From Favorite',
  props<{ cityName: string }>()
);

export const changeWeatherUnits = createAction(
  '[Favorite List] Update Units',
);

