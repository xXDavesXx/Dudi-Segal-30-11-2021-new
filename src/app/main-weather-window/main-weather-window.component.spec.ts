import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWeatherWindowComponent } from './main-weather-window.component';

describe('MainWeatherWindowComponent', () => {
  let component: MainWeatherWindowComponent;
  let fixture: ComponentFixture<MainWeatherWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainWeatherWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainWeatherWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
