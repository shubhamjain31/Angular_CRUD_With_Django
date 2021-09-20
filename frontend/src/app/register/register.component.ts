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

  alert:boolean = false;
  activeVerificationCodeSent:boolean = false;

  createUser= new FormGroup({
    name:     new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email:    new FormControl('', Validators.required),
    mobile:   new FormControl('', Validators.required)
  })

  constructor(private commonservice:CommonService) { }

  ngOnInit(): void {
    password:''
  }

  onAlertClose(): void {
   this.activeVerificationCodeSent = false;
  }

  register(){
    this.alert = true;
    console.log(this.alert)
    if(this.createUser.invalid) {
      return;
    }

    console.log(this.createUser.value);
    this.commonservice.createUser(this.createUser.value).subscribe((data)=>{
      //  if (data["saved"]){
      //   this.route.navigate(['/select-service'])
      // }
    })
    this.createUser.reset();
    // this.alert = false;
  }

}
