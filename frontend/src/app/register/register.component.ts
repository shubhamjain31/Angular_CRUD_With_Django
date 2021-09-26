import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user: any;
  submitted:boolean = false;
  public error_msg: any;
  staticAlertClosed:boolean  = false;

  createUser= new FormGroup({
    name:     new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    email:    new FormControl('', [Validators.required, Validators.email]),
    mobile:   new FormControl('', Validators.required)
  })

  constructor(private commonservice:CommonService, private route: Router, private toastr: ToastrService) { }

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
    this.staticAlertClosed = true;

    if(this.createUser.invalid) {
      return;
    }

    this.commonservice.createUser(this.createUser.value).subscribe((data: any)=>{
       if (data["saved"]){
        this.route.navigate(['/login'])
        this.showSuccessAlert();
      }
      else if (data["exists"]){
        this.error_msg = "User with this email already exists."
        this.showErrorAlert(this.error_msg);
      }
      else if (data["fail"]){
        this.error_msg = "Something Went Wrong!"
        this.showErrorAlert(this.error_msg);
      }
    })
    this.createUser.reset();
    this.submitted = false;
  }

  showSuccessAlert() {
    this.toastr.show('<span class="fa fa-check" [data-notify]="icon"></span> <span>&nbsp;&nbsp;User Registered Successfully!</span>', '', {
      timeOut: 6000,
      enableHtml: true,
      toastClass: "alert alert-primary alert-with-icon",
      // positionClass: 'toast-top-center'
    });
  }

  showErrorAlert(msg:string) {
    this.toastr.show('<span class="fa fa-times" [data-notify]="icon"></span> <span>&nbsp;&nbsp;'+msg+'</span>', '', {
      timeOut: 6000,
      enableHtml: true,
      toastClass: "alert alert-danger alert-with-icon",
    });
  }

}
