import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySearchInputComponent } from './city-search-input.component';

describe('CitySearchInputComponent', () => {
  let component: CitySearchInputComponent;
  let fixture: ComponentFixture<CitySearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitySearchInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitySearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
