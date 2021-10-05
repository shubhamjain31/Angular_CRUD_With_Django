import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAddEditRestaurantComponent } from './menu-add-edit-restaurant.component';

describe('MenuAddEditRestaurantComponent', () => {
  let component: MenuAddEditRestaurantComponent;
  let fixture: ComponentFixture<MenuAddEditRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuAddEditRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAddEditRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
