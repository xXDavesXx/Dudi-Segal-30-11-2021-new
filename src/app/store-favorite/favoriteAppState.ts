import {WeatherModelsModel} from "../Models/weatherModels.model";

export interface FavoriteAppState {
  favorites: ReadonlyArray<WeatherModelsModel>;
}
