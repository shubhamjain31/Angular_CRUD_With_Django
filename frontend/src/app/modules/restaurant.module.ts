import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantComponent } from '../restaurant/restaurant.component';
import { AddRestaurantComponent } from '../restaurant/add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from '../restaurant/edit-restaurant/edit-restaurant.component';
import { DeleteRestaurantComponent } from '../restaurant/delete-restaurant/delete-restaurant.component';
import { ShowRestaurantComponent } from '../restaurant/show-restaurant/show-restaurant.component';
import { MenuRestaurantComponent } from '../restaurant/menu-restaurant/menu-restaurant.component';
import { MenuAddEditRestaurantComponent } from '../restaurant/menu-restaurant/menu-add-edit-restaurant/menu-add-edit-restaurant.component';
import { SharedModule } from './shared.module';


@NgModule({
  declarations: [
    RestaurantComponent,
    AddRestaurantComponent,
    EditRestaurantComponent,
    DeleteRestaurantComponent,
    ShowRestaurantComponent,
    MenuRestaurantComponent,
    MenuAddEditRestaurantComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RestaurantModule { }
