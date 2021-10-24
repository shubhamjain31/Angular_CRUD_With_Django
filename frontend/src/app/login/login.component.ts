import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:      any;
  public error_msg: any;
  public csrf:      any;
  public sessionid: any;

  submitted:boolean          = false;
  template_form: boolean     = true;
  loader: boolean            = false;

  loginUser = new FormGroup({
    emailaddress:    new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })


  // npm install ngx-cookie-service --save(For install cookieservice)
  constructor(private authenticationService:AuthenticationService, private router: Router, private cookieService:CookieService) { }

  setCookie(csrf: any, session: any){
    this.cookieService.set('sessionid', session);
    this.cookieService.set('csrftoken', csrf);
   }

   deleteCookie(){
     this.cookieService.deleteAll();
   }

  ngOnInit(): void {
    this.authenticationService.is_logged_in();
    this.template_form = true;
    
  }

  login(){
    this.submitted = true;

    if(this.loginUser.invalid) {
      return;
    }
    
    this.authenticationService.loginUser(this.loginUser.value).subscribe((data: any)=>{
       if (data["success"]){
          this.template_form = false;
          this.loader = true;

          this.csrf = data['csrf']
          console.log(this.csrf)
          this.sessionid = data['sessionid']
          this.setCookie(this.csrf, this.sessionid)

          setTimeout(()=>{                       
              this.router.navigateByUrl('/home');
         }, 3000)
          
      }
      else if (data["fail"]){
        this.error_msg = data["msg"]
      }
    })

    this.loginUser.reset();
    this.submitted = false;
    }

    check_login(){
      this.authenticationService.is_logged_in()
    }
}
