import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {

  addRestaurent = new FormGroup({
    name:   new FormControl(''),
    Adress: new FormControl(''),
    email:  new FormControl('')
  })

  constructor(private commonservice:CommonService) { }

  ngOnInit(): void {
  }

  create(){
    console.log(this.addRestaurent.value);
      this.commonservice.addRestaurant(this.addRestaurent.value).subscribe((result)=>{
      console.log("Get Data From Service", result)
    })
      this.addRestaurent.reset()
  }

}
