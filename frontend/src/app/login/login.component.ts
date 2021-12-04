import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

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
  public socialUser: SocialUser = new SocialUser;

  submitted:boolean          = false;
  template_form: boolean     = true;
  loader: boolean            = false;
  staticAlertClosed:boolean  = false;

  loginUser = new FormGroup({
    email:    new FormControl('', [Validators.required, Validators.email]),
    pass: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })


  // npm install ngx-cookie-service --save(For install cookieservice)
  constructor(private authenticationService:AuthenticationService, private router: Router, private cookieService:CookieService, private socialAuthService: SocialAuthService
     ,private toastr: ToastrService) { }

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

    this.socialAuthService.authState.subscribe((socialUser: any) => {
      this.socialUser = socialUser;
      this.SocialloginService(socialUser);
    });
    
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

          this.csrf = data['csrf'];
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
      this.authenticationService.is_logged_in();
    }

    loginWithGoogle(): void {
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    SocialloginService(socialUser: any){
      this.authenticationService.loginUser(socialUser).subscribe((data: any)=>{
       if (data["success"]){
        this.router.navigate(['/login']);
       }

       if (data["fail"]){
        this.error_msg = "Something Went Wrong."
        this.showErrorAlert(this.error_msg);
       }

       if (data["exists"]){
        this.error_msg = "Email Already Exists."
        this.showErrorAlert(this.error_msg);
       }
     });
    }

    showSuccessAlert(msg:string) {
    this.toastr.show('<span class="fa fa-check" [data-notify]="icon"></span> <span>&nbsp;&nbsp;'+msg+'</span>', '', {
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
