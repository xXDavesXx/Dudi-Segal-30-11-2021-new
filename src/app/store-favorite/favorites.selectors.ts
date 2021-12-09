import { createSelector, createFeatureSelector } from '@ngrx/store';
import {OneDay, WeatherModelsModel} from "../Models/weatherModels.model";

export const selectFavorites = createFeatureSelector<ReadonlyArray<WeatherModelsModel>>('favorites');

export const selectFavoriteCollection = createSelector(
  selectFavorites,
  (favorites) => {
    return favorites;
  },
);
