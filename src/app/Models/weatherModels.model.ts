
export interface WeatherModelsModel {
  cityName: string;
  days: OneDay[];
}

export interface OneDay {
  dayData: DayNight;
  nightData: DayNight;
  date: string;
}

interface DayNight {
  icon: number;
  iconPhrase: string;
  temperature: Temperature;
}

interface Temperature {
  temperatureValue: number;
  units: string;
}
