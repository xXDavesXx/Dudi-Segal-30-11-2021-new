import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteWeatherLocationsComponent } from './favorite-weather-locations.component';

describe('FavoriteWeatherLocationsComponent', () => {
  let component: FavoriteWeatherLocationsComponent;
  let fixture: ComponentFixture<FavoriteWeatherLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteWeatherLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteWeatherLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
