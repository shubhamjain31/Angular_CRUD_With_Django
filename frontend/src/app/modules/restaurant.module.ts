import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { RestaurantComponent } from '../restaurant/restaurant.component';
import { AddRestaurantComponent } from '../restaurant/add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from '../restaurant/edit-restaurant/edit-restaurant.component';
import { DeleteRestaurantComponent } from '../restaurant/delete-restaurant/delete-restaurant.component';
import { ShowRestaurantComponent } from '../restaurant/show-restaurant/show-restaurant.component';
import { MenuRestaurantComponent } from '../restaurant/menu-restaurant/menu-restaurant.component';
import { MenuAddEditRestaurantComponent } from '../restaurant/menu-restaurant/menu-add-edit-restaurant/menu-add-edit-restaurant.component';
import { GalleryRestaurantComponent } from '../restaurant/gallery-restaurant/gallery-restaurant.component';

import { SharedModule } from './shared.module';
import { LoginGuard } from '../login/login.guard';


const routes: Routes = [
   {
    component:AddRestaurantComponent,
    path:'add',
    canActivate: [LoginGuard]
  },
  {
    component:EditRestaurantComponent, 
    path:'update/:id',
    canActivate: [LoginGuard]
  },
  {
    component:ShowRestaurantComponent, 
    path:'show',
    canActivate: [LoginGuard]
  },
  {
    component:MenuRestaurantComponent, 
    path:'menu',
    canActivate: [LoginGuard]
  },
  {
    component:MenuAddEditRestaurantComponent, 
    path:'add-menu/:id',
    canActivate: [LoginGuard]
  },
  {
    component:GalleryRestaurantComponent, 
    path:'gallery/:id',
    canActivate: [LoginGuard]
  }
];


@NgModule({
  declarations: [
    RestaurantComponent,
    AddRestaurantComponent,
    EditRestaurantComponent,
    DeleteRestaurantComponent,
    ShowRestaurantComponent,
    MenuRestaurantComponent,
    MenuAddEditRestaurantComponent,
    GalleryRestaurantComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RestaurantModule {
  constructor(){
    console.log('restaurant modeule loaded')
  }
 }
