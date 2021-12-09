import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCityBoxComponent } from './favorite-city-box.component';

describe('CityBoxComponent', () => {
  let component: FavoriteCityBoxComponent;
  let fixture: ComponentFixture<FavoriteCityBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteCityBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCityBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
