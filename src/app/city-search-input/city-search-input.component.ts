import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import _cities from '../../assets/cities.json';
import {map, startWith} from "rxjs/operators";

@Component({
  selector: 'app-city-search-input',
  templateUrl: './city-search-input.component.html',
  styleUrls: ['./city-search-input.component.scss']
})
export class CitySearchInputComponent implements OnInit, OnChanges{

  @Input() dayNightMode: string;
  @Output() selectedCity = new EventEmitter<string>();

  searchForm = new FormGroup({
    cityName: new FormControl(''),
  });

  cities = _cities.map(city => {
    return city.name;
  });

  filteredOptions$: Observable<string[]>;
  mode: string = 'day';

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const dayNightMode: SimpleChange = changes['dayNightMode'];

    if (dayNightMode && dayNightMode.currentValue) {
      this.mode = dayNightMode.currentValue;
    }
  }

  ngOnInit(){
    this.onValueChanged();
  }

  onValueChanged(): void{
    this.filteredOptions$ = this.searchForm.controls.cityName.valueChanges.pipe(
      startWith(''),
      map((value:any) => this._filter(value)));
  }

  private _filter(value: string): string[]{
    const filterValue = value.toLowerCase();
    return this.cities.filter(city => city.toLowerCase().includes(filterValue));
  }

  sendCityReq(): void {
    const value = this.searchForm.value.cityName;
    this.selectedCity.emit(value);
  }

  preventNonEnglishLetters(key: any): boolean {
    const keyValue = key.which;
    if(keyValue == 32) return true;
    if(48 <= keyValue && keyValue <= 57) return true;
    if(65 <= keyValue && keyValue <= 90) return true;
    if(97 <= keyValue && keyValue <= 122) return true;
    return false;
  }
}
