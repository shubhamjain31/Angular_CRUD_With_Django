import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  alert:boolean = false;

  createUser= new FormGroup({
    name:     new FormControl(''),
    password: new FormControl(''),
    email:    new FormControl(''),
    mobile:   new FormControl('')
  })

  constructor(private commonservice:CommonService) { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.createUser.value);
    this.commonservice.createUser(this.createUser.value).subscribe((data)=>{
      console.log(data,"data created sucessfull")
      //  if (data["saved"]){
      //   this.route.navigate(['/select-service'])
      // }
    })
  }

}
