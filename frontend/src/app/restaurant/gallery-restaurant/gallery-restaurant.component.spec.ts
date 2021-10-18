import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryRestaurantComponent } from './gallery-restaurant.component';

describe('GalleryRestaurantComponent', () => {
  let component: GalleryRestaurantComponent;
  let fixture: ComponentFixture<GalleryRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
