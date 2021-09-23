import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: any;
  submitted:boolean = false;
  public error_msg: any;

  createUser= new FormGroup({
    name:     new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email:    new FormControl('', [Validators.required, Validators.email]),
    mobile:   new FormControl('', Validators.required)
  })

  constructor(private commonservice:CommonService, private route: Router) { }

  ngOnInit(): void {
      this.user = {
      name: '',
      password:'',
      email: '',
      mobile: ''
    }
  }

  register(){
    this.submitted = true;

    if(this.createUser.invalid) {
      return;
    }

    this.commonservice.createUser(this.createUser.value).subscribe((data: any)=>{
       if (data["saved"]){
        this.route.navigate(['/select-service'])
      }
      else if (data["exists"]){
        this.error_msg = "User with this email already exists."
      }
      else if (data["fail"]){
        this.error_msg = "Something Went Wrong!"
      }
    })
    this.createUser.reset();
    this.submitted = false;
  }

}
