import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';

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

  constructor(private commonservice:CommonService, private route: Router, private toaster: ToasterService) { }

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
        this.route.navigate(['/login'])
      }
      else if (data["exists"]){
        this.error_msg = "User with this email alraedy exists."
      }
      else if (data["fail"]){
        this.error_msg = "Something Went Wrong!"
      }
    })
    this.createUser.reset();
    this.submitted = false;
  }

  showSuccessToaster() {
    console.log('first')
    this.toaster.show('success', 'Well done!', 'This is a success alert');
  }

}
