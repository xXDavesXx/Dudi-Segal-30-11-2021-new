import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyWeatherBoxComponent } from './daily-weather-box.component';

describe('WeatherBoxComponent', () => {
  let component: DailyWeatherBoxComponent;
  let fixture: ComponentFixture<DailyWeatherBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyWeatherBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyWeatherBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
