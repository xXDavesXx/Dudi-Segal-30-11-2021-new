import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainWeatherWindowComponent } from './main-weather-window/main-weather-window.component';
import { FavoriteWeatherLocationsComponent } from './favorite-weather-locations/favorite-weather-locations.component';
import { DailyWeatherBoxComponent } from './boxes/daily-weather-box/daily-weather-box.component';
import { FavoriteCityBoxComponent } from './boxes/favorite-city-box/favorite-city-box.component';
import { CitySearchInputComponent } from './city-search-input/city-search-input.component';

import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatChipsModule} from "@angular/material/chips";
import {MatListModule} from "@angular/material/list";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { StoreModule } from '@ngrx/store';
import { favoritesReducer } from './store-favorite/favorites.reducers';
import {HttpClientModule} from "@angular/common/http";
import { WeekForecastComponent } from './week-forecast/week-forecast.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [
    AppComponent,
    MainWeatherWindowComponent,
    FavoriteWeatherLocationsComponent,
    DailyWeatherBoxComponent,
    FavoriteCityBoxComponent,
    CitySearchInputComponent,
    WeekForecastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({favorites: favoritesReducer, cityOnDisplay: favoritesReducer}),
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatChipsModule,
    MatListModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
